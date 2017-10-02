
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import React from 'react';

import TextInputStyle from '../styles/loader.scss';

/****************************************************************************************/

class Loader extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return this.props.visible ? (
			<div className="loader-modal">
				<div className="loader"></div>
			</div>
		) : null;
	}
}

Loader.defaultProps = {
	visible: false
};

export {Loader};