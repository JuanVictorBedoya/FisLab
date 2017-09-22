
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

export {IconFislab, IconCancel};
