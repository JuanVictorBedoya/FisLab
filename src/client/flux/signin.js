
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import Reflux from 'reflux';
import jwtDecode from 'jwt-decode';

import api from '../api';

/****************************************************************************************/

var SignInActions = Reflux.createActions([
	'in', 'out', 'showStatus'
]);

class SignInStore extends Reflux.Store {
	constructor() {
		super();

		let usr = JSON.parse(localStorage.getItem('user'));

		this.state = {
			error: null,
			user: usr || { status: 'unregistered' }
		};

		this.listenables = SignInActions;
	}

	onIn(data) {
		this._call(api.account.signin, data);
	}

	onOut() {

	}

	onShowStatus() {
		let auth = localStorage.getItem('authorization');
		if(auth) {
			let user = jwtDecode(auth),
				data = { id: user.id };
			this._call(api.account.showStatus, data);
		}
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

export { SignInActions, SignInStore };