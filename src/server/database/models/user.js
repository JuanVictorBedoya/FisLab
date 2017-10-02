
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import mongoose from 'mongoose';
import randomstring from 'randomstring';
import co from 'co';
import crypto from 'crypto';

import {AppDate} from '../../common/date';
import {Transaction} from '../transaction';

/****************************************************************************************/

class UserSchema extends mongoose.Schema {
	constructor() {
		let emailSchema = new mongoose.Schema({
			email: { type: mongoose.Schema.Types.ObjectId, ref: 'Email', required: true, unique: true },
			current: { type: Boolean, required: true, default: true },
			verified: { type: Boolean, required: true, default: false  },
			verificationId: { type: String, required: true, unique: true, default: UserSchema.generateEmailVerificationId },
			creationDate: { type: String, default: AppDate.now },
			modifiedDate: { type: String, default: AppDate.now }
		});

		let passwordSchema = new mongoose.Schema({
			encrypted: { type: String, required: true },
			current: { type: Boolean, required: true, default: true },
			creationDate: { type: String, default: AppDate.now },
			modifiedDate: { type: String, default: AppDate.now }
		});

		super({
			firstName: { type: String, required: true },
			lastName: { type: String, required: true },
			emails: [emailSchema],
			passwords: [passwordSchema],
			company: { type: String },
			status: { type: String, required: true, default: 'unverified' },
			verificationId: { type: String, required: true, unique: true, default: UserSchema.generateAccountVerificationId },
			sessionId: { type: String, required: true, unique: true, default: UserSchema.generateSessionId },
			creationDate: { type: String, default: AppDate.now },
			modifiedDate: { type: String, default: AppDate.now }
		});

		this.path('emails').validate(function(value) {
			return value.length;
		},'El campo \'emails\' no puede ser un array vacío');

		this.methods.insertPassword = this.insertPassword;
		this.methods.auth = this.auth;
	}

	/**
	 * 
	 * @param {*} data = {
	 * 		password: String
	 * 	}
	 */
	insertPassword(text, cryptParams) {
		return Transaction.execTimeout(4000, ()=>{
			let foundPass = this.passwords.find(pass=>{return pass.current === true;});
			if(foundPass) {
				foundPass.current = false;
				foundPass.modifiedDate = AppDate.now();
			}
			this.passwords.push({
				encrypted: UserSchema.encryptPassword(text, cryptParams)
			});
			return this.save();
		});
	}

	auth(password, cryptParams) {
		let self = this;
		return new Promise(function(resolve, reject){
			let thepass = self.passwords.find(pass=>{return pass.current;});
			if(thepass){
				let decrypted = UserSchema.decryptPassword(thepass.encrypted, cryptParams);
				if(decrypted === password){
					resolve(thepass);
				}else{
					reject({message: 'Contraseña incorrecta'});
				}
			}else{
				reject({message: 'El usuario no tiene contraseña'});
			}
		});
	}


	static generateSessionId() {
		return randomstring.generate(24);
	}

	static generateAccountVerificationId() {
		let gen = randomstring.generate;
		return gen(32) + '-' + gen(32);
	}

	static generateEmailVerificationId() {
		let gen = randomstring.generate;
		return gen(16) + '-' + gen(16) + '-' + gen(16);
	}

	static encryptPassword(text, params){
		var cipher = crypto.createCipher(params.algorithm, params.secret);
		var crypted = cipher.update(text, 'utf8', 'hex');
		crypted += cipher.final('hex');
		return crypted;
	}

	static decryptPassword(text, params){
		var decipher = crypto.createDecipher(params.algorithm, params.secret);
		var dec = decipher.update(text, 'hex', 'utf8');
		dec += decipher.final('utf8');
		return dec;
	}
}

class UserModel {
	constructor(db) {
		this.db = db;
		this.schema = new UserSchema();
		this.model = db.connection.model('User', this.schema);
	}

	insertOne(data) {
		let db = this.db,
			self = this,
			transaction = new Transaction();
		return transaction.run(function*(){
			let existsEmail = yield db.models.email.findOne({email: data.email});
			if(existsEmail){
				throw { message: 'El correo electrónico ' + data.email + ' ya fue registrado. Porfavor intente usar un correo electrónico diferente' };
			}
			let insertedEmail = yield transaction.insert(db.models.email.model, {email: data.email});

			let inserted = yield transaction.insert(self.model, {
				firstName: data.firstName,
				lastName: data.lastName,
				company: data.company,
				emails: [{email: insertedEmail._id}]
			});

			return inserted;
		});
	}

	findOne(q) {
		let self = this;
		return co(function*() {
			let user = yield Transaction.execTimeout(4000, ()=>{
				return self.model.findOne(q);
			});

			if(!user){ throw { message: 'No se ha encontrado el usuario' }; }

			return user;
		});
	}

	findOneWithEmail(q) {
		let self = this;
		return co(function*() {
			let user = yield Transaction.execTimeout(4000, ()=>{
				return self.model.findOne(q);
			});

			if(!user){ throw { message: 'No se ha encontrado el usuario' }; }

			let remail = user.emails.find(email=>{return email.current;}),
				cemail = yield self.db.models.email.findOne({_id: remail.email});

			user.email = cemail;

			return user;
		});
	}

	findOneByEmail(data) {
		let self = this;
		return co(function*(){
			let existsEmail = yield self.db.models.email.findOne({email: data.email});

			if(!existsEmail){
				throw { message: 'El correo electrónico ' + data.email + ' no está registrado' };
			}

			let user = yield Transaction.execTimeout(4000, ()=>{
				return self.model.findOne({'emails.email': existsEmail._id});
			});

			user.email = existsEmail;
			return user;
		});
	}

	verify(session, params) {
		let self = this,
			transaction = new Transaction();
		return transaction.run(function*(){
			let user = yield Transaction.execTimeout(4000, ()=>{
				return self.model.findOne({sessionId: session, verificationId: params.uvid});
			});
			if(!user){ throw { message: 'No se ha encontrado el usuario' }; }

			let remail = user.emails.find(email=>{
				return (email.verificationId === params.evid) && email.current;
			});
			if(!remail){ throw { message: 'No se ha encontrado el email para el usuario' }; }

			if(user.status === 'unverified') {
				remail.verified = true;
				remail.modifiedDate = AppDate.now();
				user.status = 'verified';
				user.modifiedDate = AppDate.now();
				yield user.save();
			}

			let cemail = yield self.db.models.email.findOne({_id: remail.email});
			user.email = cemail;
			return user;
		});
	}

	insertPassword(session, data) {
		let self = this,
			transaction = new Transaction();
		return transaction.run(function*(){
			let user = yield Transaction.execTimeout(4000, ()=>{
				return self.model.findOne({sessionId: session});
			});
			if(!user){ throw { message: 'No se ha encontrado el usuario' }; }

			yield user.insertPassword(data.password, self.db.cryptUserPassword);

			user.status = 'active';
			user.modifiedDate = AppDate.now();
			yield user.save();

			return user;
		});
	}

	auth(data) {
		let self = this,
			transaction = new Transaction();
		return transaction.run(function*(){
			let user = yield self.findOneByEmail(data);
			yield user.auth(data.password, self.db.cryptUserPassword);

			user.sessionId = UserSchema.generateSessionId();
			user.modifiedDate = AppDate.now();
			yield user.save();

			return user;
		});
	}
}

export {UserModel};