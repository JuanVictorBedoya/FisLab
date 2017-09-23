
/****************************************************************************************

	Copyright (c) 2016-2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import express from 'express';

/****************************************************************************************/

class ApiRouter {
	constructor(app) {
		this.router = express.Router();

		this.router.get('/', (req, res)=>{
			res.send('Im in the API');
		});

		this.router.post('/user/signup', app.controllers.api.signup.create);
	}
}

export {ApiRouter};