
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import React from 'react';

import {DefaultView} from '../../views/default.jsx';

/****************************************************************************************/

class DefaultController {
	constructor() {
	}

	index(req, res) {
		res.render(<DefaultView/>);
	}
}

export {DefaultController};
