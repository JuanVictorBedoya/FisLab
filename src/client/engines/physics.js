
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

var OIMO = require('oimo');

/****************************************************************************************/

class Physics {
	constructor() {
	}

	create(opt) {
		this.world = new OIMO.World({
			timestep: opt.dt,
			iterations: 8,
			broadphase: 2, // 1 brute force, 2 sweep and prune, 3 volume tree
			worldscale: 500, // scale full world
			random: true,  // randomize sample
			info: false,   // calculate statistic or not
			gravity: [0,-9.8,0]
		});

		this.ground = this.world.add({size:[4702, 1, 1380], pos:[0,0,0]});

		this.box1 = this.world.add({
			type:'box', // type of shape : sphere, box, cylinder
			size:[100,100,100], // size of shape
			pos:[0,2000,0], // start position in degree
			rot:[0,5,10], // start rotation in degree
			move:true, // dynamic or statique
			density: 0.1,
			friction: 0.2,
			restitution: 0.5,
			belongsTo: 1, // The bits of the collision groups to which the shape belongs.
			collidesWith: 0xffffffff // The bits of the collision groups with which the shape collides.
		});

		setInterval(this.onTick.bind(this), opt.dt*1000 );
	}

	reset(opt) {
		this.box1.resetPosition(0, 2000, 0);
		this.box1.resetRotation(Math.floor(Math.random() * 90), Math.floor(Math.random() * 90), Math.floor(Math.random() * 90));
		//this.box1.resetRotation(0, 5, 10);
	}

	onTick() {
		this.world.step();
		postMessage({
			box1: {
				position: this.box1.getPosition(),
				quaternion: this.box1.getQuaternion()
			}
		});
	}
}

/****************************************************************************************/

let p = new Physics();
self.onmessage = function(e) {
	switch(e.data.action) {
	case 'create': p.create(e.data); break;
	case 'reset': p.reset(e.data); break;
	default: break;
	}
};
