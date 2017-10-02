
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import React from 'react';

import {Navbar, NavBrand, NavLink} from '../components/navbar.jsx';

import {AppLogo_0} from '../components/app-logo.jsx';

/****************************************************************************************/

class Profile extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<header>
					<Navbar>
						<NavBrand logoComponent={AppLogo_0} logoStyle={{height: '32px', width: '32px', padding: '0.6rem'}}/>
						<NavLink text="Inicio"/>
					</Navbar>
				</header>
				<main>
					<div className="container">
						<div className="row">
							<div className="col s12 l3 no-padding">
								<div className="row">
									<div className="col s5 l12 no-padding">
										<div style={{backgroundColor: 'red', width: '100%', height: '5rem'}}>

										</div>
									</div>
									<div className="col s7 l12 no-padding">
										<div style={{backgroundColor: 'yellow', width: '100%', height: '5rem'}}>

										</div>
									</div>
								</div>
							</div>
							<div className="col s12 l9 no-padding">
								<div style={{backgroundColor: 'green', width: '100%', height: '20rem'}}>

								</div>
							</div>
						</div>
					</div>
				</main>
				<footer>
				</footer>
			</div>
		);
	}
}

export { Profile };