
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import React from 'react';
import ReactDOM from'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import {TextInput} from '../../src/client/components/text-input.jsx';
import {Button} from '../../src/client/components/button.jsx';

import GridStyle from '../../src/client/styles/grid.scss';

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

					<Route exact={true} path="/grid" component={GridDemo}/>
				</Demo>
			</BrowserRouter>, container);
		document.body.appendChild(container);
	}
}

/****************************************************************************************/

var app = new App();
