
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import mongoose from 'mongoose';
import randomstring from 'randomstring';

import {AppDate} from '../../common/date';
import {Transaction} from '../transaction';

/****************************************************************************************/

class UserSchema extends mongoose.Schema {
	constructor() {
		let emailSchema = new mongoose.Schema({
			code: { type: String, ref: 'Email', required: true, unique: true },
			current: { type: Boolean, required: true, default: true },
			verified: { type: Boolean, required: true, default: false  },
			verificationHash: { type: String, required: true, unique: true, default: UserSchema.generateEmailVerificationHash },
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
			code: { type: String, required: true, unique: true, default: UserSchema.generateCode },
			firstName: { type: String, required: true },
			lastName: { type: String },
			emails: [emailSchema],
			passwords: [passwordSchema],
			companies: { type: String, required: true },
			creationDate: { type: String, default: AppDate.now },
			modifiedDate: { type: String, default: AppDate.now }
		});

		this.path('emails').validate(function(value) {
			return value.length;
		},'El campo \'emails\' no puede ser un array vacío');
	}

	static generateCode() {
		let gen = randomstring.generate;
		return gen(8) + '-' + gen(4) + '-' + gen(8);
	}

	static generateEmailVerificationHash() {
		let gen = randomstring.generate;
		return gen(32) + '-' + gen(32) + '-' + gen(32);
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
			transaction = new Transaction();
		return transaction.run(function*(){
			let existsEmail = yield db.models.email.findOne({email: data.email});
			if(existsEmail){
				throw 'El correo electrónico ' + data.email + ' ya fue registrado. Porfavor intente usar un correo electrónico diferente';
			}
			
			let insertedEmail = yield transaction.insert(db.models.email.model, {email: data.email});

			return insertedEmail;
		});
	}
}

export {UserModel};