
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
		let pathstyle = {fill:'none', stroke:'url(#'+this.props.id+'linearGradient1000)', strokeWidth:2.5, strokeLinecap:'butt', strokeLinejoin:'miter', strokeMiterlimit:4, strokeDasharray:'none', strokeOpacity:1};
		return (
			<svg viewBox="0 0 31.220833 33.866668" style={this.props.style}>
				<defs>
					<linearGradient id={this.props.id+'linearGradient998'}>
						<stop stopColor="#6a389b" stopOpacity="0.98895025" offset="0"/>
						<stop stopColor="#1292ad" stopOpacity="1" offset="0.7500695"/>
						<stop stopColor="#22b9ce" stopOpacity="1" offset="1"/>
					</linearGradient>
					<linearGradient gradientUnits="userSpaceOnUse" y2="68.224701" x2="52.538692" y1="11.528274" x1="52.72768" id={this.props.id+'linearGradient1000'} xlinkHref={'#'+this.props.id+'linearGradient998'}/>
				</defs>
				<g style={{display: 'inline'}} transform="translate(0 -263.13)">
					<g style={{strokeWidth:1, strokeMiterlimit:4, strokeDasharray:'none'}} transform="matrix(.57867 0 0 .58471 -14.783 256.77)">
						<g style={{stroke:'url(#'+this.props.id+'linearGradient1000)'}}>
							<path d="m26.458 53.862-0.18899-27.97 26.458-14.363 26.08 14.552v27.781l-26.269 14.363z" style={pathstyle}/>
							<path d="m26.458 53.862 13.04-6.9926 25.891 14.363" style={pathstyle}/>
							<path d="m78.808 53.862-13.229-7.1815-25.702 14.363" style={pathstyle}/>
							<path d="m26.269 39.499 26.269-13.607 26.08 13.607" style={pathstyle}/>
							<path d="m39.499 46.869-0.37798-28.159" style={pathstyle}/>
							<path d="m65.579 46.68 0.18899-27.781" style={pathstyle}/>
							<path d="m52.539 25.891 0.18899-14.363" style={pathstyle}/>
							<path d="m39.121 32.506 13.796 7.3705 13.04-7.1815" style={pathstyle}/>
							<path d="m52.917 39.876-0.37798 14.174" style={pathstyle}/>
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

class IconPlay extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<svg viewBox="0 0 320 512" className={this.props.className} style={this.props.style}>
				<path d="M309 233c7 6 11 14 11 23s-4 17-11 23L31 445c-4 2-7 3-11 3-11 0-20-9-20-20V84c0-11 9-20 20-20 4 0 8 1 11 3z"></path>
			</svg>
		);
	}
}

class IconStop extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<svg viewBox="0 0 1064.428 1234" className={this.props.className} style={this.props.style}>
				<path d="M168.428 5h768q53 0 90.5 37.5t37.5 90.5v768q0 53-37.5 90.5t-90.5 37.5h-768q-53 0-90.5-37.5t-37.5-90.5V133q0-53 37.5-90.5t90.5-37.5z"></path>
			</svg>
		);
	}
}

export {IconFislab, IconCancel, IconMail, IconWork, IconPlay, IconStop};
