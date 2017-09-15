
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import React from 'react';
import ReactDOM from'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import { Home } from '../views/home.jsx';
import { Signup } from '../views/signup.jsx';

import GridStyle from '../styles/grid.scss';

/****************************************************************************************/

class Main extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (<div>{this.props.children}</div>);
	}
}

/****************************************************************************************/

class App {
	constructor() {
		document.addEventListener('DOMContentLoaded', this.onDOMContentLoaded.bind(this));
	}

	onDOMContentLoaded() {
		this._mainSection = window.document.getElementById('app-main');

		this.render();
	}

	render() {
		ReactDOM.render(
			<BrowserRouter>
				<Main>
					<Route exact={true} path="/" component={Home}/>
					<Route exact={true} path="/registro" component={Signup}/>
				</Main>
			</BrowserRouter>,
			this._mainSection);
	}
}

/****************************************************************************************/

var app = new App();
