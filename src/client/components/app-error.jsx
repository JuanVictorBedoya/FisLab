
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
		let data = this.props.data,
			msg = null,
			msgs = null;

		if(typeof(data) === 'string') {
			msg = data;
		} else {
			msg = data.message;
			msgs = data.messages;
		}
		return (
			<div className="error-card">
				<div style={{display: 'block'}}>
					<IconCancel style={{width: '1.2rem', height: '1.2rem', fill: 'white'}}/>
					<b className="error-card-title"><b>ERROR</b></b>
				</div>
				<div>
					<ul>
						{ msg ? <li><span>{msg}</span></li>:null }
						{
							msgs ?
								msgs.map(_msg=>{
									return (<li><span>{_msg}</span></li>);
								}) : null
						}
					</ul>
				</div>
			</div>
		);
	}
}

export {AppError};