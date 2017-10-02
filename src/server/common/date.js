
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import moment from 'moment';
moment.locale('es');

/****************************************************************************************/

class AppDate {
	constructor(connection) {
	}

	static now() {
		return moment().format('L LTS');
	}
}

export {AppDate};