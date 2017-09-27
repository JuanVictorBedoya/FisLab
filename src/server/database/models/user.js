
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import mongoose from 'mongoose';
import randomstring from 'randomstring';
import co from 'co';

import {AppDate} from '../../common/date';
import {Transaction} from '../transaction';

/****************************************************************************************/

class UserSchema extends mongoose.Schema {
	constructor() {
		let emailSchema = new mongoose.Schema({
			email: { type: mongoose.Schema.Types.ObjectId, ref: 'Email', required: true, unique: true },
			current: { type: Boolean, required: true, default: true },
			verified: { type: Boolean, required: true, default: false  },
			verificationID: { type: String, required: true, unique: true, default: UserSchema.generateEmailVerificationID },
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
			verificationID: { type: String, required: true, unique: true, default: UserSchema.generateAccountVerificationID },
			creationDate: { type: String, default: AppDate.now },
			modifiedDate: { type: String, default: AppDate.now }
		});

		this.path('emails').validate(function(value) {
			return value.length;
		},'El campo \'emails\' no puede ser un array vacío');
	}


	static generateAccountVerificationID() {
		let gen = randomstring.generate;
		return gen(32) + '-' + gen(32);
	}

	static generateEmailVerificationID() {
		let gen = randomstring.generate;
		return gen(16) + '-' + gen(16) + '-' + gen(16);
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

	/*findOneByEmail(data) {
		let self = this;
		return co(function*(){
			let existsEmail = yield self.db.models.email.findOne({email: data.email});

			if(!existsEmail){
				throw { msg: 'El correo electrónico ' + data.email + ' no está registrado' };
			}

			let user = yield Transaction.execTimeout(4000, ()=>{
				return self.model.findOne({'emails._id': existsEmail._id});
			});

			return user;
		});
	}*/
}

export {UserModel};