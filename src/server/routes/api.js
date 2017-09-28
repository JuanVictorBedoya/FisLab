
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

		this.router.post('/account/create', app.controllers.api.signup.create);
		this.router.get('/account/:id/status', app.mwValidateParam, app.controllers.api.signup.showStatus);
		this.router.put('/account/verify', app.controllers.api.signup.verify);

		this.router.use((req, res)=>{
			res.status(404).send({msg: 'Recurso no encontrado'});
		});
	}
}

export {ApiRouter};