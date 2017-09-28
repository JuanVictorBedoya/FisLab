
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import Reflux from 'reflux';

import api from '../api';

/****************************************************************************************/

var SignUpActions = Reflux.createActions([
	'create', 'verify'
]);

class SignUpStore extends Reflux.Store {
	constructor() {
		super();

		//localStorage.removeItem('user');
		let usr = JSON.parse(localStorage.getItem('user'));

		this.state = {
			error: null,
			user: usr || { status: 'unregistered' }
		};

		this.listenables = SignUpActions;
	}

	onCreate(data) {
		this.setState({error: null});
		api.account.create(data)
			.then(response => {
				let user = response.data.user;
				this.setState({user});
				localStorage.setItem('user', JSON.stringify(user));
			})
			.catch(error => {
				this.setState({error: error.response.data});
			});
	}

	onVerify(data) {
		api.account.verify(data)
			.then(response => {
				let user = response.data.user;
				this.setState({user});
				localStorage.setItem('user', JSON.stringify(user));
			})
			.catch(error => {
				this.setState({error: error.response.data});
			});
	}


}

export { SignUpActions, SignUpStore };