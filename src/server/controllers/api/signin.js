
/****************************************************************************************

	Copyright (c) 2016-2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import React from 'react';
import co from 'co';

/****************************************************************************************/

class SignInController {
	constructor() {
	}

	index(req, res) {
	}

	login(req, res) {
		co(function*() {
			yield req.body.validate({
				attributes: {
					email: { required: true, email: true },
					password: { required: true }
				},
				validationMessages: {
					email: {
						required: 'Debes proporcionar tu correo electrónico',
						email: 'Debes proporcionar un correo electrónico válido'
					},
					password: { required: 'Debes proporcionar el parámetro \'password\'' }
				}
			});

			let user = yield req.db.models.user.auth(req.body);
			let token = yield req.authenticator.sign({id: user.sessionId, firstName: user.firstName, email: user.email.email});
		
			return {
				user: { id: user.sessionId, status: user.status, },
				authorization: token
			};
		}).then(obj=>{
			res.json(obj);
		}).catch(err=>{
			if(!err.status) {err.status = 500;}
			res.status(err.status).json(err);
		});
	}
}

export {SignInController};