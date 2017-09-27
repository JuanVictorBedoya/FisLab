
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import React from 'react';
import co from 'co';

/****************************************************************************************/

class SignUpController {
	constructor() {
	}

	index(req, res) {
	}

	create(req, res) {
		co(function*(){
			yield req.body.validate({
				attributes: {
					firstName: { required: true, type: 'string', alphaSpace: true },
					lastName: { required: true, type: 'string', alphaSpace: true },
					email: { required: true, email: true },
					company: { type: 'string', alphanumeric: true },
				},
				validationMessages: {
					firstName: {
						required: 'Debes proporcionar tu nombre',
						type: 'El campo \'Nombre\' debe ser una cadena de carateres',
						alphaSpace: 'Tu nombre no debe contener números u otros caracteres especiales'
					},
					lastName: {
						required: 'Debes proporcionar tu(s) apellido(s)',
						type: 'El campo \'Apellido\' debe ser una cadena de carateres',
						alphaSpace: 'Tu apellido no debe contener números u otros caracteres especiales'
					},
					email: {
						required: 'Debes proporcionar tu correo electrónico',
						email: 'Debes proporcionar un correo electrónico válido'
					},
					company: {
						type: 'El campo \'Organización\' debe ser una cadena de carateres',
						alphanumeric: 'El campo \'Organización\' debe ser alfanumérico'
					}
				}
			});

			let user = yield req.db.models.user.insertOne(req.body),
				remail = user.emails.find(email=>{return email.current;}),
				cemail = yield req.db.models.email.findOne({_id: remail.email}),
				msg = req.mailer.buildMessage('acountVerification', {name: user.firstName, verificationHash: remail.verificationHash});
			
			yield req.mailer.send(msg, cemail.email);

			return {user: {id: user._id, email: cemail.email}};

		}).then(obj=>{
			res.json(obj);
		}).catch(err=>{
			if(!err.status) {err.status = 500;}
			res.status(err.status).json(err);
		});
	}
}

export {SignUpController};