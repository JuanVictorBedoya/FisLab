
/****************************************************************************************

	Copyright (c) 2016-2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import express from 'express';

import {HomeController} from '../app/web/home-controller';
import {SignupController} from '../app/web/signup-controller';
import {SignInController} from '../app/web/signin-controller';

/****************************************************************************************/

class WebRouter {
	constructor() {
		this.router = express.Router();

		this.controller = {
			home: new HomeController,
			signup: new SignupController,
			signin: new SignInController
		};
		
		this.router.get('/', this.controller.home.index);
		this.router.get('/registro', this.controller.signup.index);
		this.router.get('/login', this.controller.signin.index);
	}
}

export {WebRouter};
