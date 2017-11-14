
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import React from 'react';

import {Http404View} from '../../views/errors.jsx';

/****************************************************************************************/

class ErrorsController {
	constructor() {
	}

	http404(req, res, next) {
		res.status(404).render(<Http404View/>);
	}
}

export {ErrorsController};
