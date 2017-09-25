
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import mongoose from 'mongoose';
import randomstring from 'randomstring';

import {AppDate} from '../../common/date';

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
		this.schema = new UserSchema();
		this.model = db.connection.model('User', this.schema);
	}
}

export {UserModel};