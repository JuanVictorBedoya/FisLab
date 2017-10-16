
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import React from 'react';
import co from 'co';

/****************************************************************************************/

class ProfileController {
	constructor() {
	}

	index(req, res) {
	}

	show(req, res) {
		co(function*() {
			yield req.params.validate({
				attributes: {
					id: { required: true, type: 'sessionId' },
				},
				validationMessages: {
					id: {
						required: 'Debes proporcionar el parámetro \'id\'',
						type: 'El parámetro \'id\' no es un identificador válido'
					}
				}
			});

			let user = yield req.db.models.user.findOneWithEmail({sessionId: req.params.id});
			return {user: {
				id: user.sessionId,
				status: user.status,
				name: user.firstName + ' ' + user.lastName,
				email: user.email.email,
				company: user.company
			}};
		}).then(obj=>{
			res.json(obj);
		}).catch(err=>{
			if(!err.status) {err.status = 500;}
			res.status(err.status).json(err);
		});
	}
}

export {ProfileController};
