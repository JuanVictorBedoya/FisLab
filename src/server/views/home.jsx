
/****************************************************************************************

	Copyright (c) 2016-2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import React from 'react';

/****************************************************************************************/

class HomeView extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
		<html>
			<head>
				<title>FisLab</title>
				<meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=1, maximum-scale=1"/>
			</head>
			<body>
				<div id="app-main">FisLab</div>
			</body>
		</html>)
	}
}

export {HomeView}
