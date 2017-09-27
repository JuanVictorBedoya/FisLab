
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import Reflux from 'reflux';

import api from '../api';

/****************************************************************************************/

var SignUpActions = Reflux.createActions([
	'create'
]);

class SignUpStore extends Reflux.Store {
	constructor() {
		super();

		this.state = {
			error: null
		};

		this.listenables = SignUpActions;
	}

	onCreate(data) {
		this.setState({error: null});
		api.account.create(data)
			.then(response => {
				
			})
			.catch(error => {
				this.setState({error: error.response.data});
			});
	}
}

export { SignUpActions, SignUpStore };