
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import React from 'react';

import {SimulationView} from '../../views/simulation.jsx';

/****************************************************************************************/

class ExperimentController {
	constructor() {
	}

	index(req, res) {
		res.render(<SimulationView/>);
	}
}

export {ExperimentController};
