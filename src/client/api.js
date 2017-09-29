
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import axios from 'axios';

/****************************************************************************************/

var origin = window.location.origin;

var account = {
	create: function(data) {
		return axios.post(origin + '/api/account/create', data);
	},

	verify: function(data) {
		return axios.put(origin + '/api/account/verify', data);
	},

	showStatus: function(id) {
		return axios.get(origin + '/api/account/' + id + '/status');
	}
};

module.exports = {
	account: account
};