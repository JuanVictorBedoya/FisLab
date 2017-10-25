
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import React from 'react';
import co from 'co';

/****************************************************************************************/

class SimulationApiController {
	constructor() {
	}

	index(req, res) {
	}

	show(req, res) {
		co(function*() {
			yield req.params.validate({
				attributes: {
					id: { required: true, type: 'string' },
				},
				validationMessages: {
					id: {
						required: 'Debes proporcionar el parámetro \'id\'',
						type: 'El parámetro \'id\' no es un identificador válido'
					}
				}
			});

			return {
				simulation: {
					name: 'simulation 1'
				}
			};
		}).then(obj=>{
			res.json(obj);
		}).catch(err=>{
			if(!err.status) {err.status = 500;}
			res.status(err.status).json(err);
		});
	}
}

export {SimulationApiController};
