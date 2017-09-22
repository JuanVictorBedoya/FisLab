
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import React from 'react';
import { Link } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';

import {Button} from '../components/button.jsx';
import {Form} from '../components/form.jsx';
import {TextInput} from '../components/text-input.jsx';

import {AppLogo_0, AppLogo_1} from '../components/app-logo.jsx';

import SignInStyle from '../styles/app-signin.scss';

/****************************************************************************************/

class SignIn extends React.Component {
	constructor(props) {
		super(props);

		this.status = {
			toMain: false,
			pageClass: 'signin-page',
			currentPageClass: 'signin-page signin-page-current'
		};
	}

	componentDidMount() {
		this.refs.signinMain.addEventListener('animationend', this.onTogglePagesAnimationEnd.bind(this), false);
	}

	onMainFormSubmit() {

	}

	onUsfxFormSubmit() {

	}

	onUsfxSignIn() {
		this.togglePages(this.refs.signinUsfx, this.refs.signinMain);
		this.status.toMain = false;
	}

	onBackToSignIn() {
		this.togglePages(this.refs.signinMain, this.refs.signinUsfx);
		this.status.toMain = true;
	}

	onSignInWithFacebook(facebookUser) {

	}
	
	onTogglePagesAnimationEnd() {
		let mainp = this.refs.signinMain,
			usfxp = this.refs.signinUsfx;

		if(this.status.toMain) {
			mainp.className = this.status.currentPageClass;
			usfxp.className = this.status.pageClass;
		}else {
			mainp.className = this.status.pageClass;
			usfxp.className = this.status.currentPageClass;
		}
	}

	togglePages(inPage, outPage) {
		outPage.classList.add('signin-page-moveToLeft');
		inPage.classList.add('signin-page-moveFromRight');
		inPage.classList.add('signin-page-on-transition');
	}

	render() {
		return (
			<div>
				<header>
					
				</header>
				<main>
					<div ref="signinMain" className="signin-page signin-page-current">
						<div className="signin-container">
							<div className="row" style={{paddingTop: '1rem'}}>
								<div className="col s12">
									<AppLogo_0 id="app_logo_0" style={{height: '5rem', width: '5rem', margin: '0 auto', display: 'block'}}/>
									<AppLogo_1 fontSize="3rem"/>
								</div>
							</div>
							<div className="row">
								<div className="col s12">
									<Form onSubmit={this.onMainFormSubmit.bind(this)}>
										<div>
											<h4>Iniciar sesión</h4>
										</div>
										<div>
											<TextInput name="email" label="E-mail" placeholder="Tu email" type="email" required={true}/>
											<TextInput name="passw" label="Contraseña" placeholder="Contraseña" type="password" required={true}/>
										</div>
										<div style={{marginTop: '1rem'}}>
											<Button text="Iniciar sesión" type="submit"/>
										</div>
										<div>
											<p className="note">Si aún no tienes una cuenta, puedes <Link to="/registro"><b>Registrarte aquí</b></Link>. También puedes iniciar sesión usando uno de los siguientes servicios</p>
										</div>
										<div>
											<button className="btn kep-login-usfx" type="button" onClick={this.onUsfxSignIn.bind(this)}>
												<span>Acceso universitario</span>
											</button>
											<FacebookLogin
												appId="136635746918254"
												fields="name,email,picture"
												textButton="Iniciar con facebook"
												icon="fa-facebook"
												callback={this.onSignInWithFacebook.bind(this)} />
										</div>
									</Form>
								</div>
							</div>
						</div>
					</div>
					<div ref="signinUsfx" className="signin-page">
						<div className="signin-container">
							<div className="row" style={{paddingTop: '1rem'}}>
								<div className="col s12">
									<AppLogo_0 id="app_logo_1" style={{height: '5rem', width: '5rem', margin: '0 auto', display: 'block'}}/>
									<AppLogo_1 fontSize="3rem"/>
								</div>
							</div>
							<div className="row">
								<div className="col s12">
									<Form onSubmit={this.onUsfxFormSubmit.bind(this)}>
										<div>
											<h4>Acceso universitario</h4>
										</div>
										<div>
											<TextInput name="cu" label="Carnet universitario" placeholder="CU" required={true}/>
											<TextInput name="ci" label="Cédula de identidad" placeholder="CI" type="password" required={true}/>
										</div>
										<div>
											<button className="btn kep-login-usfx" type="submit">
												<span>Iniciar sesión</span>
											</button>
										</div>
										<div>
											<p className="note">Introduce tu numero de carnet universitario ej. (35-666), y tu numero de carnet de identidad ej. (4374391)</p>
										</div>
										<div>
											<button className="btn" type="button" onClick={this.onBackToSignIn.bind(this)}>
												<span>Volver</span>
											</button>
										</div>
									</Form>
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		);
	}
}

export { SignIn };