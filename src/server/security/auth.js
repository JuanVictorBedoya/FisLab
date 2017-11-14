
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import passport from 'passport';
import CustomStrategy from 'passport-custom';
import jwt from 'jsonwebtoken';
import co from 'co';

/****************************************************************************************/

class Authenticator {
	constructor(app, config) {
		app.auth = this.auth;

		this.rsa = config.rsa;
		this.algorithm = config.algorithm;

		passport.use('jwt', new CustomStrategy(this.authorize.bind(this)));
	}

	sign(payload) {
		let cert = this.rsa.private,
			alg = this.algorithm;
		return new Promise(function(resolve, reject){
			jwt.sign(payload, cert, { algorithm: alg }, function(err, token) {
				if(err){ reject(err); }else{ resolve(token); }
			});
		});
	}

	verify(token) {
		let cert = this.rsa.public,
			alg = this.algorithm;
		return new Promise(function(resolve, reject){
			jwt.verify(token, cert, { algorithms: [alg] }, function (err, payload) {
				if(err){ reject(err); }else{ resolve(payload); }
			});
		});
	}

	auth(req, res, next) {
		passport.authenticate('jwt', function(err, user, info) {
			if(err) {
				return res.status(500).json(err);
			}
			if(!user) {
				return res.status(401).json(info);
			}
			next();
			return user;
		})(req, res, next);
	}

	authorize(req, callback) {
		//console.log('AUTH HEADERS -->', req.headers);
		if(req.headers && req.headers.authorization){
			let token = req.headers.authorization;
			this.verify(token).then(payload=>{
				this.onAuthenticate(req, payload, callback);
			}).catch(err=>{
				this.onUnauthorized({message: 'Credenciales de usuario inválidos'}, callback);
			});
		}else{
			this.onUnauthorized({message: 'El usuario no tiene credenciales'}, callback);
		}
	}

	onAuthenticate(req, jwt_payload, callback) {
		let self = this,
			cnn = req.db;

		co(function*() {
			let user = yield cnn.models.user.findOneWithEmail({sessionId: jwt_payload.id});
			return user;
		}).then(user=>{
			callback(null, user);
		}).catch(info=>{
			self.onUnauthorized(info, callback);
		});
	}

	onUnauthorized(info, callback) {
		console.log('ADVERTENCIA:', info);
		callback(null, false, info);
	}
}

export {Authenticator};