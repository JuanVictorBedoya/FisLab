
/****************************************************************************************

	Copyright (c) 2016-2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import mongoose from 'mongoose';

/****************************************************************************************/

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

		cnn.on('error', ()=>{
			console.error('connection error:');
		});
		
		cnn.once('open', ()=>{
			console.log('connection OK:');
		});

		this.initModels();
	}

	initModels() {
		this.models = {
			
		};
	}
}

export {DB};