
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import React from 'react';

import TextInputStyle from '../styles/progress.scss';

/****************************************************************************************/

class Progress extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let style = {
			width: this.props.progress + '%',
			backgroundColor: this.props.color
		};
		return (
			<div className="progress-wrapper">
				<div className="progress" style={style}>
					<span className="progress-text"><b>{this.props.text}</b></span>
				</div>
			</div>
		);
	}
}

Progress.defaultProps = {
	progress: 0,
	color: '#b3e5fc'
};

export {Progress};