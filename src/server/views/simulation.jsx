
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import React from 'react';

/****************************************************************************************/

class SimulationView extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<html>
				<head>
					<title>FisLab</title>
					<meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=1, maximum-scale=1"/>
					<link rel="stylesheet" type="text/css" href="/css/fislab.min.css"/>
				</head>
				<body>
					<div id="app-main"></div>
					<script src="/js/fislab.simulation.min.js"/>
				</body>
			</html>
		);
	}
}

export {SimulationView};
