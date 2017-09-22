
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
		return (
			<button className="btn" type={this.props.type}>
				{this.props.text}
			</button>
		);
	}
}

Button.defaultProps = {
	type: 'button'
};

export { Button };
