
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
		co(function*() {
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
				msg = req.mailer.buildMessage('acountVerification', {
					name: user.firstName,
					sessionId: user.sessionId,
					accountVerificationId: user.verificationId,
					emailVerificationId: remail.verificationId
				});
			
			yield req.mailer.send(msg, cemail.email);
			return {user: {id: user.sessionId, status: user.status}};
		}).then(obj=>{
			res.json(obj);
		}).catch(err=>{
			if(!err.status) {err.status = 500;}
			res.status(err.status).json(err);
		});
	}

	verify(req, res) {
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
			yield req.body.validate({
				attributes: {
					uvid: { required: true },
					evid: { required: true },
				},
				validationMessages: {
					uvid: { required: 'Debes proporcionar el parámetro \'uvid\'' },
					evid: { required: 'Debes proporcionar el parámetro \'evid\'' }
				}
			});

			let user = yield req.db.models.user.verify(req.params.id, req.body),
				token = yield req.authenticator.sign({id: user.sessionId, firstName: user.firstName, email: user.email.email});
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

	showStatus(req, res) {
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

			let user = yield req.db.models.user.findOne({sessionId: req.params.id});
			return {user: {id: user.sessionId, status: user.status}};
		}).then(obj=>{
			res.json(obj);
		}).catch(err=>{
			if(!err.status) {err.status = 500;}
			res.status(err.status).json(err);
		});
	}

	createPassword(req, res) {
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
			yield req.body.validate({
				attributes: {
					password: { required: true }
				},
				validationMessages: {
					password: { required: 'Debes proporcionar el parámetro \'password\'' }
				}
			});

			let user = yield req.db.models.user.insertPassword(req.params.id, req.body);
			return {user: {id: user.sessionId, status: user.status}};
		}).then(obj=>{
			res.json(obj);
		}).catch(err=>{
			if(!err.status) {err.status = 500;}
			res.status(err.status).json(err);
		});
	}
}

export {SignUpController};