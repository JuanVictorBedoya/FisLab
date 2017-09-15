
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import React from 'react';

/****************************************************************************************/

class Form extends React.Component {
	constructor(props) {
		super(props);
	}

	onSubmit(e) {
		let fn = this.props.onSubmit;
		e.preventDefault();
		return fn ? fn(e) : false;
	}

	onValidate(e) {
		let fn = this.props.onValidate;
		return fn ? (fn(e) ? this.onSubmit(e) : false) : this.onSubmit(e);
	}

	render() {
		return (
			<form onSubmit={this.onValidate.bind(this)}>
				{this.props.children}
			</form>
		);
	}
}

export { Form };
