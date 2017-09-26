
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import mongoose from 'mongoose';
import validator from 'validator';

import {AppDate} from '../../common/date';
import {Transaction} from '../transaction';

/****************************************************************************************/

class EmailSchema extends mongoose.Schema {
	constructor() {
		super({
			email: { type: String, required: true, unique: true },
			creationDate: { type: String, default: AppDate.now },
			modifiedDate: { type: String, default: AppDate.now }
		});

		this.path('email').validate(function(value) {
			return validator.isEmail(value);
		},'El campo \'email\' no es válido');
	}
}

class EmailModel {
	constructor(db) {
		this.schema = new EmailSchema();
		this.model = db.connection.model('Email', this.schema);
	}

	findOne(q, lastly) {
		return Transaction.execTimeout(4000, ()=>{ return this.model.findOne(q); }, lastly);
	}
}

export {EmailModel};