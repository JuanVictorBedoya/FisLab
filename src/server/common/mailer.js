
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import React from 'react';
import { renderToString } from 'react-dom/server';
import nodemailer from 'nodemailer';

/****************************************************************************************/

class AcountVerificationMessage extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		let url =	this.props.site.domain+'/registro/verificar/' +
					this.props.user.sessionId + '/' +
					this.props.user.accountVerificationId + '/' +
					this.props.user.emailVerificationId,
			company = this.props.site.name;
		return(
			<div>
				<b>{company}</b>
				<p>Hola {this.props.user.name}</p>
				<p>Haz clic en el siguiente enlace para verificar la dirección de email de tu cuenta de {company}®:</p>
				<a href={url}>{url}</a>
				<p>Verificar tu dirección de email te permitirá usar todas las opciones de tu cuenta de {company}, sin gastos adicionales, en cualquier momento.</p>
				<p>Si deseas más información, <a>haz clic aquí</a> para ver las Preguntas Frecuentes o contacta con el equipo de Asistencia de {company}.</p>
				<p>Atentamente,<br/>Equipo de asistencia de {company}</p>
			</div>
		);
	}
}

/****************************************************************************************/

class Mailer {
	constructor(config) {
		this.opt = config;
	}

	buildMessage(msgName, data) {
		switch(msgName) {
		case 'acountVerification':
			return {
				subject: 'Correo de verificación de tu cuenta de FisLab - Accion requerida',
				html: renderToString(<AcountVerificationMessage site={this.opt.site} user={data}/>)
			};
		}
	}

	send(msg, receivers, sender) {
		if(!sender){
			sender = this.opt;
		}

		return new Promise(function(resolve, reject){
			var smtpConfig = {
				service: sender.service,
				auth: {
					user: sender.email,
					pass: sender.password
				}
			};
			var transporter = nodemailer.createTransport(smtpConfig);
			var mailOptions = {
				from: sender.email,
				to: receivers, // list of receivers
				subject: msg.subject,
				html: msg.html
			};

			transporter.sendMail(mailOptions, function(error, info){
				if(error){
					reject(error);
				}else{
					resolve(info.response);
				}
			});
		});
	}
}

export {Mailer};