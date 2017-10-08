
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import express from 'express';
import passport from 'passport';

/****************************************************************************************/

class ApiRouter {
	constructor(app) {
		this.router = express.Router();

		this.router.get('/', (req, res)=>{
			res.send('Im in the API');
		});

		let api = app.controllers.api,
			auth = app.auth;

		this.router.post('/account/create', api.signup.create);
		this.router.put('/account/:id/verify', app.mwValidateParams, api.signup.verify);
		this.router.get('/account/:id/status', app.mwValidateParams, api.signup.showStatus);
		this.router.post('/account/:id/password/create', auth, app.mwValidateParams, api.signup.createPassword);

		this.router.post('/account/signin', api.signin.login);

		this.router.get('/account/:id/show', auth, app.mwValidateParams, api.profile.show);

		this.router.use((req, res)=>{
			res.status(404).send({msg: 'Recurso no encontrado'});
		});
	}
}

export {ApiRouter};