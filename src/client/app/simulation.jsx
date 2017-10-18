
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import React from 'react';
import ReactDOM from'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import { Experiment } from '../views/experiment.jsx';


import MainStyles from '../styles/app.scss';

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
					<Route exact={true} path="/simulacion/:experiment/" component={Experiment}/>
				</Main>
			</BrowserRouter>,
			this._mainSection);
	}
}

/****************************************************************************************/

var fislabApp = new App();

window.fislab = {
	title: ''
};
