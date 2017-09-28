
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import axios from 'axios';

/****************************************************************************************/

var url = 'http://localhost:8080';

var account = {
	create: function(data) {
		return axios.post(url + '/api/account/create', data);
	},

	verify: function(data) {
		return axios.put(url + '/api/account/verify', data);
	},

	showStatus: function(id) {
		return axios.get(url + '/api/account/' + id + '/status');
	}
};

module.exports = {
	account: account
};