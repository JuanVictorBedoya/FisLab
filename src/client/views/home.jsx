
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import React from 'react';
import { Link } from 'react-router-dom';

import {Navbar, NavBrand, NavLink} from '../components/navbar.jsx';

import {AppLogo_0, AppLogo_1} from '../components/app-logo.jsx';

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
					<div className="fi-home-main">
						<AppLogo_0 style={{height: '9rem', width: '9rem', padding: '0.6rem', margin: '0 auto', display: 'block'}}/>
						<AppLogo_1 fontSize="4rem"/>
						<div className="container">
							<p className="fi-home-welcome">Welcome to FisLab, our objetive is to enthuse students to conduct experiments by arousing their curiosity. This would help them in learning basic and advanced concepts through remote experimentation</p>
							<div>
								<Link to="/login">
									<button className="fi-home-main-btn" type="button">
										<span>Iniciar sesión</span>
									</button>
								</Link>
							</div>
							<div>
								<Link to="/registro">
									<button className="fi-home-main-btn" type="button">
										<span>Registrarme</span>
									</button>
								</Link>
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

export { Home };
