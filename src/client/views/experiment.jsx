
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import React from 'react';
import Reflux from 'reflux';

import {Navbar, NavBrand, NavLink, NavUser, NavUserLink, NavUserActionButton} from '../components/navbar.jsx';

import {AppLogo_0} from '../components/app-logo.jsx';

import {ProfileActions, ProfileStore} from '../flux/profile';

/****************************************************************************************/

class Experiment extends Reflux.Component {
	constructor(props) {
		super(props);

		this.store = ProfileStore;
	}

	componentWillMount() {
		super.componentWillMount();
		ProfileActions.load();
	}

	componentDidMount() {
		if(this.state.user.status !== 'loading') {
			if(this.state.user.status !== 'active') {
				window.location.href = '/login';
			}
		}
	}

	onLogoutClick() {
		ProfileActions.logout(()=>{
			window.location.href = '/login';
		});
	}

	render() {
		let u = (this.state.user && this.state.user.status === 'active') ? this.state.user : null,
			e = this.state.error;

		if(u && !u.picture) {
			u.picture = '/images/profile-pic.jpg';
		}

		return (
			<div>
				<header>
					<Navbar>
						<NavBrand logoComponent={AppLogo_0} logoStyle={{height: '32px', width: '32px', padding: '0.6rem'}}/>
					
						{
							u ?
								<NavUser user={u}>
									<NavUserLink href="#home" text="Ver mi perfil"/>
									<NavUserLink href="#about" text="Configuración"/>
									<NavUserActionButton text="Salir" onClick={this.onLogoutClick.bind(this)}/>
								</NavUser>
								: null
						}
					</Navbar>
				</header>
				<main>
					<div className="fi-experiment-container">
						<div className="row">
							<div className="col s12">
								<h4><b>Experimento n1</b></h4>
							</div>
						</div>
						<div className="row">
							<div className="col s12 l9">
								<div style={{width: '100%', height: '20rem', backgroundColor: 'gray'}}>

								</div>
							</div>
							<div className="col s12 l3">
								<div style={{width: '100%', height: '20rem', backgroundColor: 'green'}}>

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

export { Experiment };
