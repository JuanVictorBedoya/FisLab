
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import React from 'react';
import { Link } from 'react-router-dom';

import {Button} from '../components/button.jsx';
import {Form} from '../components/form.jsx';
import {TextInput} from '../components/text-input.jsx';

import {AppLogo_0, AppLogo_1, AppLogo_Facebook} from '../components/app-logo.jsx';

/****************************************************************************************/

class Signup extends React.Component {
	constructor(props) {
		super(props);
	}

	onFormSubmit() {

	}

	render() {
		return (
			<div>
				<header>
					
				</header>
				<main>
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
									<div>
										<h2>Datos de registro</h2>
									</div>
									<div>
										<TextInput name="fname" label="Nombre" placeholder="Nombre" required={true}/>
										<TextInput name="lname" label="Apellidos" placeholder="Apellidos" required={true}/>
										<TextInput name="email" label="E-mail" placeholder="Tu email" type="email" required={true}/>
										<TextInput name="company" label="Organizacion" placeholder="Organizacion" required={true}/>
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
				</main>
			</div>
		);
	}
}

export { Signup };