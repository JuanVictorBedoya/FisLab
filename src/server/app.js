
/****************************************************************************************

	Copyright (c) 2016-2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import http from 'http';
import path from 'path';

import express from 'express';
import { renderToString } from 'react-dom/server';
import jsonfile from 'jsonfile';
import bodyParser from 'body-parser';

import {Validator} from './security/validator';
import {Auth} from './security/auth';
import {Mailer} from './common/mailer';

import {WebRouter} from './routes/web';
import {ApiRouter} from './routes/api';

import {DB} from './database/db';

import {ErrorsController} from './controllers/web/errors';
import {DefaultController} from './controllers/web/default';

import {SignUpController} from './controllers/api/signup';
import {SignInController} from './controllers/api/signin';

/****************************************************************************************/

class App {
	constructor() {
		this.config = jsonfile.readFileSync(path.join(__dirname, 'config.json'));

		this.express = express();

		this.express.use(express.static(path.join(__dirname, 'assets')));

		this.express.use(bodyParser.urlencoded({ extended: false }));
		this.express.use(bodyParser.json());

		this.express.use(this.mwApp.bind(this));

		this.onLoad();
	}

	onLoad() {
		this.db = new DB(this.config.db);
		this.mailer = new Mailer(this.config.mail);
		this.auth = new Auth(this.config.auth);

		this.controllers = {
			web: {
				errors: new ErrorsController,
				default: new DefaultController
			},
			api: {
				signup: new SignUpController,
				signin: new SignInController
			}
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
	 * 
	 */
	mwApp(req, res, next) {
		req.db = this.db;
		req.mailer = this.mailer;
		req.auth = this.auth;

		req.body.validate = function(options) {
			let validator = new Validator(options);
			return validator.validate(req.body);
		};

		res.render = function(Component) {
			return res.send(renderToString(Component));
		};

		next();
	}

	mwValidateParams(req, res, next) {
		req.params.validate = function(options) {
			let validator = new Validator(options);
			return validator.validate(req.params);
		};

		next();
	}
}

export {App};
