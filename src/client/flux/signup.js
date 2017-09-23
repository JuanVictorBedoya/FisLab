
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
		};

		this.listenables = SignUpActions;
	}

	onCreate(data) {
		api.account.create(data)
			.then(response => {
			})
			.catch(error => {
			});
	}
}

export { SignUpActions, SignUpStore };