
/****************************************************************************************

	Copyright (c) 2016-2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import React from 'react';

/****************************************************************************************/

class SignUpController {
	constructor() {
	}

	index(req, res) {
	}

	create(req, res) {
		req.db.models.user.insertOne(req.body);
		res.json({msg:'from signup api'});
	}
}

export {SignUpController};