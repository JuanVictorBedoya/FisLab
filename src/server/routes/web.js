
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import express from 'express';

/****************************************************************************************/

class WebRouter {
	constructor(app) {
		this.router = express.Router();

		let web = app.controllers.web;

		this.router.get('/', web.default.index);
		this.router.get('/registro', web.default.index);
		this.router.get('/registro/verificar/:session/:uvid/:evid/', web.default.index);
		this.router.get('/login', web.default.index);
		this.router.get('/perfil', web.default.index);

		this.router.get('/temas/:id/simulacion', web.experiment.index);

		this.router.use(web.errors.http404);
	}
}

export {WebRouter};
