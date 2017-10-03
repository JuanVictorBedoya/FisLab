
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import Reflux from 'reflux';
import jwtDecode from 'jwt-decode';

import api from '../api';

/****************************************************************************************/

var ProfileActions = Reflux.createActions([
	'load', 'logout'
]);

class ProfileStore extends Reflux.Store {
	constructor() {
		super();

		this.state = {
			error: null,
			user: { status: 'loading' }
		};

		this.listenables = ProfileActions;
	}

	onLoad() {
		let auth = localStorage.getItem('authorization'),
			user = { status: 'unregistered' };
		if(auth) {
			let user = jwtDecode(auth),
				data = { id: user.id, auth };
			api.account.show(data)
				.then(response => {
					user = response.data.user;
					this.setState({user});
				})
				.catch(error => {
					this.setState({error: error.response.data});
				});
		} else {
			this.setState({user});
		}
	}

	onLogout(callback) {
		localStorage.removeItem('user');
		localStorage.removeItem('authorization');

		this.setState({user: { status: 'unregistered' }});

		callback();
	}
}

export { ProfileActions, ProfileStore };