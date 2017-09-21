
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import React from 'react';

import {Navbar, NavBrand, NavLink} from '../components/navbar.jsx';

import {AppLogo_0} from '../components/app-logo.jsx';

/****************************************************************************************/

class Home extends React.Component {
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
					<div>
					</div>
				</main>
				<footer>
				</footer>
			</div>
		);
	}
}

export { Home };
