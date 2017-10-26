
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
					name: 'simulation 1',

					scene: {
						geometries: [
							{
								name: 'box1',
								type: 'box',
								width: 100,
								height: 100,
								depth: 100,
								material: { color: 0xffffff },
								position: { x:0, y:200, z:0 }
							},
							{
								name: 'box2',
								type: 'box',
								width: 150,
								height: 50,
								depth: 150,
								material: {
									color: 0x0040FF
								}
							}
						],
						models: [
							{
								name: 'table1',
								resourceName: '/models/table.json',
								position: { x:0, y:-1034, z:0 },
								textureMap: '/textures/table.png',
								material: { shininess: 255, emissive: 0x151515, specular: 0x050505, color: 0xffffff }
							}
						]
					},
					physics: {}
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
