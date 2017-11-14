
/****************************************************************************************

	Copyright (c) 2016-2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import mongoose from 'mongoose';

import {EmailModel} from './models/email';
import {UserModel} from './models/user';

/****************************************************************************************/

mongoose.Promise = global.Promise;

class DB {
	constructor(config) {
		let cnnstr = 'mongodb://',
			cnn = mongoose.connection,
			opt = config.connection;

		if(opt.user && opt.user.length > 0){
			cnnstr = cnnstr + opt.user+':'+opt.pass+'@'+opt.host+':'+opt.port+'/'+opt.db;
		}else{
			cnnstr = cnnstr + opt.host+':'+opt.port+'/'+opt.db;
		}

		mongoose.connect(cnnstr, { useMongoClient: true, promiseLibrary: global.Promise });

		this.connection = mongoose.connection;
		this.connection.on('error', ()=>{
			console.error('connection error:');
		});
		this.connection.once('open', ()=>{
			console.log('connection OK:');
		});

		this.cryptUserPassword = config.cryptUserPassword;

		this.initModels();
	}

	initModels() {
		this.models = {
			email: new EmailModel(this),
			user: new UserModel(this)
		};
	}
}

export {DB};