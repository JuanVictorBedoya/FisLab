
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
		return axios.put(origin + '/api/account/' + data.id + '/verify', data);
	},

	showStatus: function(data) {
		return axios.get(origin + '/api/account/' + data.id + '/status');
	},

	password: {
		create: function(data) {
			return axios.post(origin + '/api/account/' + data.id + '/password/create', data,
				{headers: {authorization: data.auth}}
			);
		},
	},
	
	signin: function(data) {
		return axios.post(origin + '/api/account/signin', data);
	},

	show: function(data) {
		return axios.get(origin + '/api/account/' + data.id + '/show', {headers: {authorization: data.auth}});
	},
};

module.exports = {
	account: account
};