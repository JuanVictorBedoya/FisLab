
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import React from 'react';

import {IconCancel} from '../../both/components/icons.jsx';

/****************************************************************************************/

class AppError extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="error-card">
				<div style={{display: 'block'}}>
					<IconCancel style={{width: '1.2rem', height: '1.2rem', fill: 'white'}}/>
					<b className="error-card-title"><b>ERROR</b></b>
				</div>
				<div>
					<ul>
						{ this.props.data.message ? <li><span>{this.props.data.message}</span></li>:null }
						{
							this.props.data.messages ?
								this.props.data.messages.map(msg=>{
									return (<li><span>{msg}</span></li>);
								}) : null
						}
					</ul>
				</div>
			</div>
		);
	}
}

export {AppError};