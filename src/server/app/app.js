
/****************************************************************************************

	Copyright (c) 2016-2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import http from 'http';
import path from 'path';

import express from 'express';
import { renderToString } from 'react-dom/server';
import jsonfile from 'jsonfile';

import {WebRouter} from '../routes/web';
import {ApiRouter} from '../routes/api';

import {ErrorsController} from './web/errors-controller';
import {HomeController} from './web/home-controller';
import {SignupController} from './web/signup-controller';
import {SignInController} from './web/signin-controller';

/****************************************************************************************/

class App {
	constructor() {
		this.config = jsonfile.readFileSync(path.join(__dirname, 'config.json'));

		this.express = express();

		this.express.use(express.static(path.join(__dirname, 'assets')));
		this.express.use(this.setRender);

		this.onLoad();
	}

	onLoad() {
		this.controllers = {
			errors: new ErrorsController,
			home: new HomeController,
			signup: new SignupController,
			signin: new SignInController
		};

		let webRouter = new WebRouter(this),
			apiRouter = new ApiRouter(this);

		this.express.use('/api', apiRouter.router);
		this.express.use('/', webRouter.router);


		this.server = http.createServer(this.express);
		this.server.listen(this.config.port, this.onStart.bind(this));
	}

	onStart() {
		console.log('INFORMACIÓN: El servidor está listo y escuchando por el puerto:', this.config.port);
	}

	/**
	 * Render Overrider Midleware
	 */
	setRender(req, res, next) {
		res.render = function(Component) {
			return res.send(renderToString(Component));
		};
		next();
	}
}

export {App};
