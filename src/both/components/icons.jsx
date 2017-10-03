
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import React from 'react';

/****************************************************************************************/

class IconFislab extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let pathstyle = {fill:'none', stroke:'url(#linearGradient1000'+this.props.id+')', strokeWidth:2.5, strokeLinecap:'butt', strokeLinejoin:'miter', strokeMiterlimit:4, strokeDasharray:'none', strokeOpacity:1};
		let svgdefsstr = '<linearGradient id="linearGradient998'+this.props.id+'"><stop offset="0" style="stop-color:#6a389b;stop-opacity:0.98895025"/><stop style="stop-color:#1292ad;stop-opacity:1" offset="0.7500695"/><stop offset="1" style="stop-color:#22b9ce;stop-opacity:1"/></linearGradient><linearGradient gradientUnits="userSpaceOnUse" y2="68.224701" x2="52.538692" y1="11.528274" x1="52.72768" id="linearGradient1000'+this.props.id+'" xlink:href="#linearGradient998'+this.props.id+'"/>';

		return (
			<svg viewBox="0 0 31.220833 33.866668" style={this.props.style}>
				<defs dangerouslySetInnerHTML={{__html:svgdefsstr}}></defs>
				<g
					style={{display: 'inline'}}
					transform="translate(0 -263.13)">
					<g style={{strokeWidth:1, strokeMiterlimit:4, strokeDasharray:'none'}}
						transform="matrix(.57867 0 0 .58471 -14.783 256.77)">
						<g style={{stroke:'url(#linearGradient1000'+this.props.id+')'}}>
							<path
								d="m26.458 53.862-0.18899-27.97 26.458-14.363 26.08 14.552v27.781l-26.269 14.363z"
								style={pathstyle}/>
							<path
								d="m26.458 53.862 13.04-6.9926 25.891 14.363"
								style={pathstyle}/>
							<path
								d="m78.808 53.862-13.229-7.1815-25.702 14.363"
								style={pathstyle}/>
							<path
								d="m26.269 39.499 26.269-13.607 26.08 13.607"
								style={pathstyle}/>
							<path
								d="m39.499 46.869-0.37798-28.159"
								style={pathstyle}/>
							<path
								d="m65.579 46.68 0.18899-27.781"
								style={pathstyle}/>
							<path
								d="m52.539 25.891 0.18899-14.363"
								style={pathstyle}/>
							<path
								d="m39.121 32.506 13.796 7.3705 13.04-7.1815"
								style={pathstyle}/>
							<path
								d="m52.917 39.876-0.37798 14.174"
								style={pathstyle}/>
						</g>
					</g>
				</g>
			</svg>
		);
	}
}

class IconCancel extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<svg viewBox="0 0 426.667 426.667" style={this.props.style}>
				<path d="M213.333,0C95.514,0,0,95.514,0,213.333s95.514,213.333,213.333,213.333s213.333-95.514,213.333-213.333S331.153,0,213.333,0z M330.995,276.689l-54.302,54.306l-63.36-63.356l-63.36,63.36l-54.302-54.31l63.356-63.356l-63.356-63.36l54.302-54.302l63.36,63.356l63.36-63.356l54.302,54.302l-63.356,63.36L330.995,276.689z"/>
			</svg>
		);
	}
}

class IconMail extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<svg viewBox="0 0 20 20" className={this.props.className} style={this.props.style}>
				<path d="M1.574 5.286l7.5 4.03c.252.134.578.198.906.198.328 0 .654-.064.906-.2l7.5-4.028c.49-.263.95-1.286.054-1.286H1.52c-.896 0-.434 1.023.054 1.286zm17.04 2.203c-.556.288-7.388 3.848-7.728 4.026s-.578.2-.906.2-.566-.022-.906-.2-7.133-3.74-7.688-4.028c-.39-.204-.386.035-.386.22V15c0 .42.566 1 1 1h16c.434 0 1-.58 1-1V7.708s.004-.423-.387-.22z"></path>
			</svg>
		);
	}
}

class IconWork extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<svg viewBox="0 0 512 512" className={this.props.className} style={this.props.style}>
				<path d="M299 128V85h-86v43h86zm128 0q18 0 30 12.5t12 30.5v234q0 18-12 30.5T427 448H85q-18 0-30-12.5T43 405V171q0-18 12-30.5T85 128h86V85q0-18 12-30t30-12h86q18 0 30 12t12 30v43h86z"></path>
			</svg>
		);
	}
}

export {IconFislab, IconCancel, IconMail, IconWork};
