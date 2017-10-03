
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import React from 'react';
import Reflux from 'reflux';

import {Button} from '../components/button.jsx';
import {Navbar, NavBrand, NavLink, NavUser, NavUserLink, NavUserActionButton} from '../components/navbar.jsx';

import {AppError} from '../components/app-error.jsx';
import {AppLogo_0} from '../components/app-logo.jsx';

import {IconMail, IconWork} from '../../both/components/icons.jsx';

import {ProfileActions, ProfileStore} from '../flux/profile';

/****************************************************************************************/

class Profile extends Reflux.Component {
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
				this.props.history.push('/login');
			}
		}
	}

	componentWillUpdate(nextProps, nextState) {

	}

	onLogoutClick() {
		ProfileActions.logout(()=>{
			this.props.history.push('/login');
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
						<NavLink text="Inicio"/>

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
					<div className="container fi-profile-container">
						{ e ? <AppError data={e}/> : null }
						{
							u ?
								<div className="row">
									<div className="col s12 l4 fi-profile-person">
										<div className="row">
											<div className="col s5 l12 fi-profile-picture">
												<img src={u.picture} alt=""/>
											</div>
											<div className="col s7 l12 no-padding">
												<div>
													<div className="fi-profile-title">
														<h4><b>{u.name}</b></h4>
													</div>
													<ul className="fi-profile-details">
														<li>
															<div className="fi-profile-details-icon-wrapper">
																<IconMail className="fi-profile-details-icon"/>
															</div>
															<div className="fi-profile-details-data">
																<p>{u.email}</p>
															</div>
														</li>
														<li>
															<div className="fi-profile-details-icon-wrapper">
																<IconWork className="fi-profile-details-icon"/>
															</div>
															<div className="fi-profile-details-data">
																<p>{u.company}</p>
															</div>
														</li>
													</ul>
													<div>
														<Button text="Cambiar datos"/>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="col s12 l8 no-padding">
										<div style={{backgroundColor: 'lightgray', width: '100%', height: '3rem', marginBottom: '1rem'}}>

										</div>

										<div className="fi-profile-history-item">
											<h6><b>User history N1</b></h6>
											<p>This kind of error occurs when value assigned to key to in object given to sendMail method is empty. As we see it means that something wrong happens and you don't get the same data on the server-side, as you sent in client.</p>
										</div>
										<div className="fi-profile-history-item">
											<h6><b>User history N2</b></h6>
											<p>Open-source command line tools and C library (libmega) for accessing Mega.co.nz cloud storage.</p>
										</div>
										<div className="fi-profile-history-item">
											<h6><b>User history N3</b></h6>
											<p>No desc.</p>
										</div>
									</div>
								</div>
								: null
						}
					</div>
				</main>
				<footer>
				</footer>
			</div>
		);
	}
}

export { Profile };