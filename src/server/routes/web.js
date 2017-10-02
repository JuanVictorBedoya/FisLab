
/****************************************************************************************

	Copyright (c) 2016-2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import express from 'express';

/****************************************************************************************/

class WebRouter {
	constructor(app) {
		this.router = express.Router();

		this.router.get('/', app.controllers.web.default.index);
		this.router.get('/registro', app.controllers.web.default.index);
		this.router.get('/registro/verificar/:session/:uvid/:evid/', app.controllers.web.default.index);
		this.router.get('/login', app.controllers.web.default.index);

		this.router.get('/perfil', app.controllers.web.default.index);

		this.router.use(app.controllers.web.errors.http404);
	}
}

export {WebRouter};
