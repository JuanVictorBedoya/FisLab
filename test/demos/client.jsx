
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import React from 'react';
import ReactDOM from'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import {TextInput} from '../../src/client/components/text-input.jsx';
import {Button} from '../../src/client/components/button.jsx';
import {Form} from '../../src/client/components/form.jsx';
import {Navbar, NavLink, NavBrand, NavUser, NavUserLink} from '../../src/client/components/navbar.jsx';

import AppStyles from '../../src/client/styles/app.scss';

/****************************************************************************************/

class Demo extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (<div>{this.props.children}</div>);
	}
}

class Home extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (<div>FisLab Test Demos</div>);
	}
}

class GridDemo extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h3>Grid Demo</h3>
			
				<div className="row">
					<div className="col s4">
						<p>We did most of the heavy lifting for you to provide a default stylings that incorporate our custom components.</p>
					</div>
					<div className="col s4">
						<p>By utilizing elements and principles of Material Design, we were able to create a framework that focuses on User Experience.</p>
					</div>
					<div className="col s4">
						<p>We have provided detailed documentation as well as specific code examples to help new users get started.</p>
					</div>
				</div>
			</div>
		);
	}
}

class TextInputDemo extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h3>Text Input Demo</h3>
				<div className="container">
					<TextInput name="name1" label="First Name" placeholder="Placeholder"/>
					<TextInput name="name2" label="Last Name" placeholder="Placeholder"/>
					<TextInput name="pass" label="Password" placeholder="Your password" type="password"/>
					<TextInput name="email" label="Email" placeholder="Your email" type="email"/>
				</div>
			</div>
		);
	}
}

class ButtonDemo extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h3>Button Demo</h3>
				<div className="container">
					<TextInput name="name" label="Nombre" placeholder="Nombre"/>
					<Button text="Demo button"/>
					<TextInput/>
				</div>
			</div>
		);
	}
}

class FormDemo extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="container">
				<h3>Form Demo</h3>
				<Form>
					<TextInput name="name" label="Nombre" placeholder="Nombre"/>
					<Button text="Submit" type="submit"/>
				</Form>
			</div>
		);
	}
}

class AppLogo extends React.Component {
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

class AppLogo1 extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<svg version="1.0" viewBox="0 0 64 64" style={{height: '32px', width: '32px', padding: '0.6rem'}}>
				<path d="M32 .79c-17.67 0-32 14.326-32 32 0 14.138 9.17 26.133 21.884 30.365 1.6.296 2.187-.694 2.187-1.54 0-.762-.03-3.283-.043-5.957-8.903 1.936-10.78-3.776-10.78-3.776-1.456-3.7-3.554-4.682-3.554-4.682-2.903-1.986.22-1.945.22-1.945 3.212.226 4.904 3.298 4.904 3.298 2.855 4.892 7.486 3.477 9.313 2.66.287-2.068 1.116-3.48 2.032-4.28-7.108-.808-14.58-3.552-14.58-15.814 0-3.495 1.25-6.35 3.297-8.59-.333-.806-1.43-4.06.308-8.47 0 0 2.688-.86 8.802 3.282 2.552-.71 5.29-1.065 8.01-1.077 2.72.012 5.46.368 8.016 1.077 6.108-4.14 8.79-3.28 8.79-3.28 1.743 4.407.648 7.662.316 8.468 2.05 2.24 3.293 5.096 3.293 8.59 0 12.29-7.486 14.996-14.612 15.788 1.148.993 2.17 2.94 2.17 5.926 0 4.282-.037 7.728-.037 8.782 0 .852.576 1.85 2.198 1.535C54.842 58.916 64 46.925 64 32.79c0-17.674-14.328-32-32-32z"></path>
			</svg>
		);
	}
}

class NavbarDemo extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Navbar>
					<NavBrand logoComponent={AppLogo} logoStyle={{height: '32px', width: '32px', padding: '0.6rem'}}/>
					<NavLink text="Link to"/>
					<NavLink text="Link another"/>
					<NavUser userImg="images/user-demo.jpg">
						<NavUserLink href="#home" text="Your profile"/>
						<NavUserLink href="#about" text="Settings"/>
					</NavUser>
				</Navbar>

				{/*<div>
					<AppLogo style={{height: '200px', width: '200px', padding: '0.6rem'}}/>
				</div>*/}
				<div className="container">
					<h3>Navbar Demo</h3>
				</div>
			</div>
		);
	}
}

class App {
	constructor() {
		document.addEventListener('DOMContentLoaded', this.onDOMContentLoaded.bind(this));
	}

	onDOMContentLoaded() {
		this.render();
	}

	render() {
		let container = document.createElement('div');
		ReactDOM.render(
			<BrowserRouter>
				<Demo>
					<Route exact={true} path="/" component={Home}/>
					<Route exact={true} path="/text-input" component={TextInputDemo}/>
					<Route exact={true} path="/button" component={ButtonDemo}/>
					<Route exact={true} path="/form" component={FormDemo}/>
					<Route exact={true} path="/navbar" component={NavbarDemo}/>

					<Route exact={true} path="/grid" component={GridDemo}/>
				</Demo>
			</BrowserRouter>, container);
		document.body.appendChild(container);
	}
}

/****************************************************************************************/

var app = new App();
