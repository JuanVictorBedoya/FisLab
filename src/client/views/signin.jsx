
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import React from 'react';
import { Link } from 'react-router-dom';

import {Button} from '../components/button.jsx';
import {Form} from '../components/form.jsx';
import {TextInput} from '../components/text-input.jsx';

import SignInStyle from '../styles/app-signin.scss';

/****************************************************************************************/

class SignIn extends React.Component {
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
					<div className="signin">
						<img src="/images/fislab-logo-128x128.png" alt="" style={{margin: '0 auto', display: 'block'}}/>

						<Form onSubmit={this.onFormSubmit.bind(this)}>
							<div>
								<h2 style={{textAlign: 'center'}}>Iniciar sesión</h2>
							</div>
							<div>
								<TextInput name="email" label="E-mail" placeholder="Tu email" type="email" required={true}/>
								<TextInput name="passw" label="Contraseña" placeholder="Contraseña" type="password" required={true}/>
							</div>
							<div style={{marginTop: '2rem'}}>
								<Button text="Iniciar" type="submit"/>
							</div>
							<div>
								<p className="note">Al hacer clic en "Registrarme", muestras conformidad con nuestras <Link to="/condiciones">Condiciones</Link> y aceptas haber leído nuestra <Link to="/politica-datos">Polica de datos</Link>.</p>
							</div>
						</Form>
					</div>
				</main>
			</div>
		);
	}
}

export { SignIn };