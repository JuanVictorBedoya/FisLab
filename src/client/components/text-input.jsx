
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import React from 'react';

import TextInputStyle from '../styles/text-input.scss';

/****************************************************************************************/

class TextInput extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="input-group">
				{
					this.props.required ?
						<input name={this.props.name} type={this.props.type} placeholder={this.props.placeholder} required/>:
						<input name={this.props.name} type={this.props.type} placeholder={this.props.placeholder}/>
				}
				<label className="input-label" htmlFor={this.props.name}>{this.props.label}</label>
			</div>
		);
	}
}

TextInput.defaultProps = {
	type: 'text'
};

export { TextInput };
