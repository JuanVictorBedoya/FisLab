
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import React from 'react';

import AppLogoStyles from '../styles/app-logo.scss';

/****************************************************************************************/

class AppLogo_0 extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let pathstyle = {fill:'none', stroke:'url(#linearGradient1000)', strokeWidth:2.5, strokeLinecap:'butt', strokeLinejoin:'miter', strokeMiterlimit:4, strokeDasharray:'none', strokeOpacity:1};
		let svgdefsstr = '<linearGradient id="linearGradient998"><stop id="stop994" offset="0" style="stop-color:#6a389b;stop-opacity:0.98895025"/><stop style="stop-color:#1292ad;stop-opacity:1" offset="0.7500695" id="stop1002"/><stop id="stop996" offset="1" style="stop-color:#22b9ce;stop-opacity:1"/></linearGradient><linearGradient gradientUnits="userSpaceOnUse" y2="68.224701" x2="52.538692" y1="11.528274" x1="52.72768" id="linearGradient1000" xlink:href="#linearGradient998"/>';

		return (
			<svg viewBox="0 0 31.220833 33.866668" style={this.props.style}>
				<defs id="defs2" dangerouslySetInnerHTML={{__html:svgdefsstr}}></defs>
				<g
					style={{display: 'inline'}}
					id="layer2"
					transform="translate(0 -263.13)">
					<g
						style={{strokeWidth:1, strokeMiterlimit:4, strokeDasharray:'none'}}
						id="LOGO" transform="matrix(.57867 0 0 .58471 -14.783 256.77)">
						<g
							style={{stroke:'url(#linearGradient1000)'}}
							id="g992">
							<path
								id="path922"
								d="m26.458 53.862-0.18899-27.97 26.458-14.363 26.08 14.552v27.781l-26.269 14.363z"
								style={pathstyle}/>
							<path
								id="path924"
								d="m26.458 53.862 13.04-6.9926 25.891 14.363"
								style={pathstyle}/>
							<path
								id="path926"
								d="m78.808 53.862-13.229-7.1815-25.702 14.363"
								style={pathstyle}/>
							<path
								id="path928"
								d="m26.269 39.499 26.269-13.607 26.08 13.607"
								style={pathstyle}/>
							<path
								id="path930"
								d="m39.499 46.869-0.37798-28.159"
								style={pathstyle}/>
							<path
								id="path932"
								d="m65.579 46.68 0.18899-27.781"
								style={pathstyle}/>
							<path
								id="path934"
								d="m52.539 25.891 0.18899-14.363"
								style={pathstyle}/>
							<path
								id="path936"
								d="m39.121 32.506 13.796 7.3705 13.04-7.1815"
								style={pathstyle}/>
							<path
								id="path938"
								d="m52.917 39.876-0.37798 14.174"
								style={pathstyle}/>
						</g>
					</g>
				</g>
			</svg>
		);
	}
}

class AppLogo_1 extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div>
				<h1 className="fi-brand-text" style={{fontSize: this.props.fontSize}}>
					<span className="fi-first-part">fis</span>
					<span className="fi-second-part">lab</span>
				</h1>
			</div>
		);
	}
}

export { AppLogo_0, AppLogo_1 };
