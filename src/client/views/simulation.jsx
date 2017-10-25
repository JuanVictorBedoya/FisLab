
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import React from 'react';
import Reflux from 'reflux';

import {Button} from '../components/button.jsx';
import {TextInput} from '../components/text-input.jsx';

import {Navbar, NavBrand, NavLink, NavUser, NavUserLink, NavUserActionButton} from '../components/navbar.jsx';
import {Renderer} from '../components/render.jsx';

import {IconPlay, IconStop} from '../../both/components/icons.jsx';

import {AppLogo_0} from '../components/app-logo.jsx';

import {ProfileActions, ProfileStore} from '../flux/profile';
import {SimulationActions, SimulationStore} from '../flux/simulation';

/****************************************************************************************/

class Simulation extends Reflux.Component {
	constructor(props) {
		super(props);

		this.stores = [ProfileStore, SimulationStore];
	}

	componentWillMount() {
		super.componentWillMount();
		ProfileActions.load();
		SimulationActions.load('dfgdf');
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
					<div className="fi-simulation-container">
						<div className="row">
							<div className="col s12 l9">
								<div>
									<Renderer playIcon={IconPlay} stopIcon={IconStop}/>
								</div>
								<div className="fi-simulation-title">
									<h5><b>Experimento n1</b></h5>
								</div>
							</div>
							<div className="col s12 l3">
								{/*<div style={{width: '100%', height: '20rem', backgroundColor: 'green'}}>

								</div>*/}

								<div className="card-panel">
									<h6><b>Opciones del experimento</b></h6>
									<TextInput ref="email1" name="email1" label="E-mail" placeholder="Tu email" type="email" required={true}/>
									<TextInput ref="email2" name="email2" label="E-mail" placeholder="Tu email" type="email" required={true}/>
									<Button text="Iniciar sesión"/>
								</div>
							</div>
						</div>

						<div className="row">
							<div className="col s12 l9">
								<div>
									<p>As every site can vary a lot, your first-steps with the plugin will vary depending on the nature of your site. However, we would recommend thinking about how many different user roles you will require on your site and creating the roles you need.</p>
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

export { Simulation };
