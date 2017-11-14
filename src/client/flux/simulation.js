
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import Reflux from 'reflux';

import api from '../api';

/****************************************************************************************/

var SimulationActions = Reflux.createActions([
	'load'
]);

class SimulationStore extends Reflux.Store {
	constructor() {
		super();

		this.state = {
			simulation: null
		};

		this.listenables = SimulationActions;
	}

	onLoad(id) {
		let auth = localStorage.getItem('authorization');
		if(auth) {
			api.simulation.show({id, auth})
				.then(response => {
					this.setState({simulation: response.data.simulation});
				})
				.catch(error => {
				});
		}
	}
}

export { SimulationActions, SimulationStore };
