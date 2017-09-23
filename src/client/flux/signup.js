
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import Reflux from 'reflux';

/****************************************************************************************/

var SignUpActions = Reflux.createActions([
	'signup'
]);

class SignUpStore extends Reflux.Store {
	constructor() {
		super();

		this.state = {
		};

		this.listenables = SignUpActions;
	}

	onSignup() {
	}
}

export { SignUpActions, SignUpStore };