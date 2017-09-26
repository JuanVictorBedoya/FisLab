
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import validator from 'validator';

/****************************************************************************************/

var validators = {

	required: function(param, value) {
		if(typeof param == 'boolean') {
			return param ? (typeof value != 'undefined') : true;
		}
		return false;
	},

	type: function(param, value) {
		switch(param) {
		case 'string': return (typeof value == 'string');
		default: return false;
		}
	},

	alpha: function(param, value) {
		if((typeof param == 'boolean') && (typeof value == 'string')) {
			return param ? validator.isAlpha(value) : true;
		}
		return false;
	},

	alphaSpace: function(param, value) {
		if((typeof param == 'boolean') && (typeof value == 'string')) {
			if(param) {
				let strings = value.split(' ');
				for(let str of strings) {
					if(!validator.isAlpha(str)) {
						return false;
					}
				}
				return true;
			}
			return true;
		}
		return false;
	},

	alphanumeric: function(param, value) {
		if((typeof param == 'boolean') && (typeof value == 'string')) {
			return param ? validator.isAlphanumeric(value) : true;
		}
		return false;
	},

	email: function(param, value) {
		if((typeof param == 'boolean') && (typeof value == 'string')) {
			return param ? validator.isEmail(value) : true;
		}
		return false;
	}
};

class Validator {
	constructor(options) {
		this.options = options;

		if(!this.options.validationMessages) {
			this.options.validationMessages = {
			};
		}
	}

	validate(values) {
		let opts = this.options;
		return new Promise(function(resolve, reject) {
			let messages = [],
				valid = true;

			for (var attr in opts.attributes) {
				let haveValue = typeof values[attr] != 'undefined',
					required = opts.attributes[attr]['required'] === true;

				if(required || haveValue) { //skip for unrequired and undefined value
					
					for (var test in opts.attributes[attr]) {
						if(validators[test]) {
							if(!validators[test](opts.attributes[attr][test], values[attr])) {
								valid = false;
								let msg = (opts.validationMessages[attr] && opts.validationMessages[attr][test]) ?
									opts.validationMessages[attr][test] :
									('Error en la validación de ' + attr);
								messages.push(msg);
								break;
							}
						}
					}
				}
			}

			if(valid)
				resolve(true);
			else
				reject({status: 406, messages});
		});
	}
}

export {Validator};