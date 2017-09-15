
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import React from 'react';
import { Link } from 'react-router-dom';

import {Button} from '../components/button.jsx';
import {Form} from '../components/form.jsx';
import {TextInput} from '../components/text-input.jsx';

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
					<div className="row">
						<div className="col s12 l6">
							<div className="container">
								<svg version="1.1" viewBox="0 0 210 297" height="32" width="32">
									<g style="display:inline" id="layer2">
										<g style="stroke:url(#linearGradient989)" id="symbol">
											<g id="g932" style="stroke:url(#linearGradient989);stroke-opacity:1">
												<path id="path34"
													d="M 50.646033,109.12494 50.144587,51.625819 104.13359,22.876257 157.454,52.127266 l 0.16715,56.997684 -53.65471,29.08386 z"
													style="fill:none;stroke:url(#linearGradient989);stroke-width:1.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
												<path id="path36"
													d="M 50.646033,109.12494 77.55696,94.917312 130.87737,123.49973"
													style="fill:none;stroke:url(#linearGradient989);stroke-width:1.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
												<path id="path38"
													d="m 77.55696,123.33258 53.32041,-28.415268 26.74378,14.207638"
													style="fill:none;stroke:url(#linearGradient989);stroke-width:1.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
												<path id="path40"
													d="M 77.55696,94.917312 77.055513,36.916741"
													style="fill:url(#radialGradient921);stroke:url(#linearGradient989);stroke-width:1.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;fill-opacity:1" />
												<path
													id="path42"
													d="M 50.311735,79.873937 103.96644,51.960118"
													style="fill:none;stroke:url(#linearGradient989);stroke-width:1.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
												<path
													id="path44"
													d="M 157.62115,80.208235 103.96644,51.960118"
													style="fill:none;stroke:url(#linearGradient989);stroke-width:1.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
												<path
													id="path50"
													d="M 130.87737,94.917312 V 37.418187"
													style="fill:none;stroke:url(#linearGradient989);stroke-width:1.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
												<path
													id="path52"
													d="m 103.96644,51.960118 0.16715,-29.083861"
													style="fill:none;stroke:url(#linearGradient989);stroke-width:1.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
												<path
													id="path54"
													d="M 104.13359,108.9578 104.30074,79.706789 77.222664,65.666305"
													style="fill:none;stroke:url(#linearGradient989);stroke-width:1.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
											</g>
											<path
												style="fill:none;stroke:url(#linearGradient989);stroke-width:1.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
												d="M 104.30074,79.706789 131.04452,66.167751"
												id="path56" />
										</g>
									</g>
								</svg>
							</div>
							<div className="container">
								<h2>Bienvenido</h2>
								<p>Welcome to FisLab, our objetive is to enthuse students to conduct experiments by arousing their curiosity. This would help them in learning basic and advanced concepts through remote experimentation</p>
							</div>

							<div className="container" style={{marginTop: '6rem'}}>
								<img src="/images/usfx-logo.png" alt="" style={{width: '5rem'}}/>
								<img src="/images/facebook-logo.png" alt="" style={{width: '5rem'}}/>
								<p className="note">También puedes <Link to="login">Iniciar Sesión</Link> con tu cuenta de facebook, o con tus datos de estudiante si perteneces a la Universidad Sanfrancisco Xavier de Chuquisaca.</p>
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
										<p className="note">Al hacer clic en "Registrarme", muestras conformidad con nuestras <Link to="/condiciones">Condiciones</Link> y aceptas haber leído nuestra <Link to="/politica-datos">Polica de datos</Link>.</p>
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