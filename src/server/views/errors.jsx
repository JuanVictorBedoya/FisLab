
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import React from 'react';

import {IconFislab} from '../../both/components/icons.jsx';

/****************************************************************************************/

class Http404View extends React.Component {
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
					<div className="container">
						<div className="row" style={{margin: '3rem 0'}}>
							<div className="col s12 m3">
								<IconFislab style={{width: '5rem', height: '5rem', margin: '0 auto', display: 'block'}}/>
							</div>
							<div className="col s12 m9">
								<h3 style={{marginTop: '2rem', textAlign: 'center'}}>404 - The page cannot be found</h3>
							</div>
						</div>
						<div className="row">
							<h5>This is not the web page you are looking for</h5>
							<h6>Sorry, The page you are looking for cannot be found in our database. Maybe it has been moved, changed or removed. Please try to use the resources provided below to your advantage to find the right content for you, If you still cannot find it, we would be happy to assist you in finding the right page.</h6>
						</div>
						<div className="row" style={{margin: '3rem 0'}}>
							<div className="col s8 m6 l4">
								<button>Ir al inicio</button>
							</div>
						</div>
					</div>
				</body>
			</html>
		);
	}
}

export {Http404View};
