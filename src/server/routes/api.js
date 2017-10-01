
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

		let api = app.controllers.api;

		this.router.post('/account/create', api.signup.create);
		this.router.get('/account/:id/status', app.mwValidateParam, api.signup.showStatus);
		this.router.put('/account/verify', api.signup.verify);
		this.router.post('/account/:id/password/create', app.mwValidateParam, api.signup.createPassword);

		this.router.use((req, res)=>{
			res.status(404).send({msg: 'Recurso no encontrado'});
		});
	}
}

export {ApiRouter};