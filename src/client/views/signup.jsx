
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import React from 'react';
import Reflux from 'reflux';
import { Link } from 'react-router-dom';
import valid from 'password-strength';

import {Button} from '../components/button.jsx';
import {Form} from '../components/form.jsx';
import {TextInput} from '../components/text-input.jsx';
import {Progress} from '../components/progress.jsx';

import {AppError} from '../components/app-error.jsx';
import {AppLogo_0, AppLogo_1, AppLogo_Facebook} from '../components/app-logo.jsx';

import {Switch, Case} from '../../both/components/switch.jsx';

import {SignUpActions, SignUpStore} from '../flux/signup';

/****************************************************************************************/

class SignupForm extends Reflux.Component {
	constructor(props) {
		super(props);
		this.store = SignUpStore;
	}

	onFormSubmit() {
		SignUpActions.create({
			firstName: this.refs.fname.getValue(),
			lastName: this.refs.lname.getValue(),
			email: this.refs.email.getValue(),
			company: this.refs.company.getValue()
		});
	}

	render() {
		return (
			<div className="row" style={{marginTop: '2rem'}}>
				<div className="col s12 l6">
					<div className="container">
						<div>
							<AppLogo_0 style={{height: '5rem', width: '5rem', margin: '0 auto', display: 'block'}}/>
							<AppLogo_1 fontSize="3rem"/>
						</div>
					</div>
					<div className="container">
						<h2>Bienvenido</h2>
						<p>Welcome to FisLab, our objetive is to enthuse students to conduct experiments by arousing their curiosity. This would help them in learning basic and advanced concepts through remote experimentation</p>
					</div>

					<div className="container" style={{marginTop: '6rem'}}>
						<img src="/images/usfx-logo-300x300.png" alt="" style={{width: '3.5rem', paddingRight: '1rem'}}/>
						<AppLogo_Facebook style={{width: '3rem', height: '3rem', fill: '#3b5998'}}/>
						<p className="note">También puedes <Link to="login"><b>Iniciar Sesión</b></Link> con tu cuenta de facebook, o con tus datos de estudiante si perteneces a la Universidad Sanfrancisco Xavier de Chuquisaca.</p>
					</div>
				</div>

				<div className="col s12 l6">
					<Form onSubmit={this.onFormSubmit.bind(this)}>
						<div className="container">
							{ this.state.error ? <AppError data={this.state.error}/> : null }
							<div>
								<h3>Datos de registro</h3>
							</div>
							<div>
								<TextInput ref="fname" name="fname" label="Nombre" placeholder="Nombre" required={true}/>
								<TextInput ref="lname" name="lname" label="Apellidos" placeholder="Apellidos" required={true}/>
								<TextInput ref="email" name="email" label="E-mail" placeholder="Tu email" type="email" required={true}/>
								<TextInput ref="company" name="company" label="Organizacion" placeholder="Organizacion" required={true}/>
							</div>
							<div style={{marginTop: '2rem'}}>
								<Button text="Registrarme" type="submit"/>
							</div>
							<div>
								<p className="note">Al hacer clic en "Registrarme", muestras conformidad con nuestras <Link to="/condiciones"><b>Condiciones</b></Link> y aceptas haber leído nuestra <Link to="/politica-datos"><b>Polica de datos</b></Link>.</p>
							</div>
						</div>
					</Form>
				</div>
			</div>
		);
	}
}

class SignupVerifyMessage extends Reflux.Component {
	constructor(props) {
		super(props);
		this.store = SignUpStore;
	}

	render() {
		return (
			<div className="signin-container">
				<div className="card-panel" style={{marginTop: '2rem'}}>
					<div style={{padding: '1.6rem'}}>
						<AppLogo_0 id="app_logo_0" style={{height: '3rem', width: '3rem'}}/>
					</div>
					<h4>Confirma tu dirección de correo electrónico</h4>
					<p>Gracias por unirte a FisLab. Acabamos de enviarte un mensaje de confirmación a {this.state.user.email}.</p>
					<p>Haz clic en el enlace de confirmación del mensaje para completar tu registro.</p>
				</div>
			</div>
		);
	}
}

class SignupPassword extends Reflux.Component {
	constructor(props) {
		super(props);

		this.state = {
			passwordStrength: {
				percent: 0,
				color: '',
				text: ''
			}
		};

		this.store = SignUpStore;
	}

	onFormSubmit() {
		let data = {
			passw0: this.refs.passw0.getValue(),
			passw1: this.refs.passw1.getValue()
		};

		if(data.passw0 !== data.passw1)
			this.setState({error: {message: 'Contraseñas diferentes'}});
		else
			SignUpActions.setPassword(data);
	}

	onPasswordChange(value) {
		let sth = valid(value),
			psth = this.state.passwordStrength;
		if(sth.valid) {
			switch(sth.strength) {
			case 'simple': psth = {percent: 25, color: '#e53935', text: 'Débil'}; break;
			case 'medium': psth = {percent: 50, color: '#ffb300', text: 'Medio'}; break;
			case 'strong': psth = {percent: 80, color: '#43a047', text: 'Fuerte'}; break;
			}
		}else{
			psth = { percent: 0, color: '', text: '' };
		}
		this.setState({passwordStrength: psth});
	}

	render() {
		let psth = this.state.passwordStrength,
			btnDisabled = psth.percent ? false : true;
		return (
			<div className="signin-container">
				<div className="row" style={{paddingTop: '1rem'}}>
					<div className="col s12">
						<AppLogo_0 id="app_logo_0" style={{height: '5rem', width: '5rem', margin: '0 auto', display: 'block'}}/>
						<AppLogo_1 fontSize="3rem"/>
					</div>
				</div>
				<div className="row">
					<div className="col s12">
						{ this.state.error ? <AppError data={this.state.error}/> : null }
						<Form onSubmit={this.onFormSubmit.bind(this)}>
							<div>
								<h4>Establecer contraseña</h4>
							</div>
							<div>
								<TextInput ref="passw0" name="passw0" label="Nueva contraseña" placeholder="Nueva contraseña" type="password" required={true}
									onChange={this.onPasswordChange.bind(this)}/>
								<Progress progress={psth.percent} color={psth.color} text={psth.text}/>
								<TextInput ref="passw1" name="passw1" label="Confirmar contraseña" placeholder="Confirmar contraseña" type="password" required={true}/>
							</div>
							<div style={{marginTop: '1rem'}}>
								<Button text="Finalizar" type="submit" disabled={btnDisabled}/>
							</div>
						</Form>
					</div>
				</div>
			</div>
		);
	}
}

class Signup extends Reflux.Component {
	constructor(props) {
		super(props);
		this.store = SignUpStore;
	}

	componentWillMount() {
		super.componentWillMount();
		SignUpActions.showStatus();
	}

	render() {
		return (
			<div>
				<header></header>
				<main>
					<Switch match={this.state.user.status}>
						<Case path="unregistered">
							<SignupForm/>
						</Case>
						<Case path="unverified">
							<SignupVerifyMessage/>
						</Case>
						<Case path="verified">
							<SignupPassword/>
						</Case>
					</Switch>
				</main>
			</div>
		);
	}
}

/****************************************************************************************/

class SignupVerify extends Reflux.Component {
	constructor(props) {
		super(props);
		this.store = SignUpStore;
	}

	componentWillMount() {
		super.componentWillMount();
		SignUpActions.verify(this.props.match.params);
	}

	componentWillUpdate(nextProps, nextState) {
		if(!nextState.error) {
			this.props.history.push('/registro');
		}
	}

	render() {
		return (
			<div>
				<header></header>
				<main>
					<div className="signin-container">
						<div className="row" style={{paddingTop: '1rem'}}>
							<div className="col s12">
								<AppLogo_0 id="app_logo_0" style={{height: '5rem', width: '5rem', margin: '0 auto', display: 'block'}}/>
								<AppLogo_1 fontSize="3rem"/>
							</div>
						</div>
						<div className="row">
							<div className="col s12">
								{
									this.state.error ?
										<AppError data={this.state.error}/>
										:
										<div>Enviando datos...</div>
								}
							</div>
						</div>
					</div>
				</main>
			</div>
		);
	}
}

export { Signup, SignupVerify };