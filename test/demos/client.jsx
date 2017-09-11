
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import React from 'react';
import ReactDOM from'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import {TextInput} from '../../src/client/components/text-input.jsx';
import {Button} from '../../src/client/components/button.jsx';

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
		return (<div><h3>Text Input Demo</h3><TextInput/></div>);
	}
}

class ButtonDemo extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (<div><h3>Button Demo</h3><Button text="Demo button"/></div>);
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
				</Demo>
			</BrowserRouter>, container);
		document.body.appendChild(container);
	}
}

/****************************************************************************************/

var app = new App();
