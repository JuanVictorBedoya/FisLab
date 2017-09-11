
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import React from 'react';

/****************************************************************************************/

class Button extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
		<button type="button">
			{this.props.text}
		</button>)
	}
}

export { TextInput }
