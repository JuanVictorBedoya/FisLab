
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import Reflux from 'reflux';
import jwtDecode from 'jwt-decode';

import api from '../api';

/****************************************************************************************/

var SignUpActions = Reflux.createActions([
	'create', 'verify', 'showStatus', 'setPassword'
]);

class SignUpStore extends Reflux.Store {
	constructor() {
		super();

		localStorage.removeItem('user');
		localStorage.removeItem('authorization');

		let usr = JSON.parse(localStorage.getItem('user'));

		this.state = {
			error: null,
			user: usr || { status: 'unregistered' }
		};

		this.listenables = SignUpActions;
	}

	onCreate(data) {
		this._call(api.account.create, data);
	}

	onVerify(data) {
		this._call(api.account.verify, data);
	}

	onShowStatus() {
		let auth = localStorage.getItem('authorization');
		if(auth) {
			let user = jwtDecode(auth),
				data = { id: user.id };
			this._call(api.account.showStatus, data);
		}
	}

	onSetPassword(data) {
		let auth = localStorage.getItem('authorization');
		if(auth) {
			let user = jwtDecode(auth);
			data.auth = auth;
			data.id = user.id;
			this._call(api.account.password.create, data);
		}
		else
			this.setState({error: {message: 'No tienes credenciales'}});
	}

	_call(fn, data) {
		this.setState({error: null});
		fn(data)
			.then(response => {
				let user = response.data.user,
					auth = response.data.authorization;

				if(auth) {
					localStorage.setItem('authorization', auth);
				}
				
				if(user) {
					this.setState({user});
					localStorage.setItem('user', JSON.stringify(user));
				}
			})
			.catch(error => {
				this.setState({error: error.response.data});
			});
	}
}

export { SignUpActions, SignUpStore };