
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import React from 'react';
import ReactDOM from'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

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

class App {
	constructor() {
		document.addEventListener("DOMContentLoaded", this.onDOMContentLoaded.bind(this));
	}

	onDOMContentLoaded() {
		this.render();
	}

	render() {
		let container = document.createElement("div");
		ReactDOM.render(
			<BrowserRouter>
				<Demo>
					<Route exact={true} path="/" component={Home}/>
				</Demo>
			</BrowserRouter>, container);
		document.body.appendChild(container);
	}
}

/****************************************************************************************/

var app = new App();
