
/****************************************************************************************

	Copyright (c) 2016-2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import express from 'express';

/****************************************************************************************/

class WebRouter {
	constructor(app) {
		this.router = express.Router();

		this.router.get('/', app.controllers.home.index);
		this.router.get('/registro', app.controllers.signup.index);
		this.router.get('/login', app.controllers.signin.index);

		this.router.use(app.controllers.errors.http404);
	}
}

export {WebRouter};
