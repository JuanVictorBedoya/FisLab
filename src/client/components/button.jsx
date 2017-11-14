
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import React from 'react';

import TextInputStyle from '../styles/button.scss';

/****************************************************************************************/

class Button extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return this.props.disabled ?
			(
				<button className="btn disabled" type={this.props.type} disabled>
					{this.props.text}
				</button>
			) :
			(
				<button className="btn" type={this.props.type} onClick={this.props.onClick}>
					{this.props.text}
				</button>
			);
	}
}

Button.defaultProps = {
	type: 'button'
};

export { Button };
