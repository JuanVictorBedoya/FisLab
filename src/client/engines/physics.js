
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
		this.world = new OIMO.World(opt.world);

		this.bodies = [];
		opt.bodies.forEach((body)=>{
			let newBody = {
				initialPos: body.pos || [0, 0, 0],
				initialRot: body.rot
			};

			if(newBody.initialRot === 'rand') {
				body.rot = [this._randRot(), this._randRot(), this._randRot()];
			}

			if(body.ref) {
				newBody.ref = body.ref;
			}

			newBody.soul = this.world.add(body);
			this.bodies.push(newBody);
		});

		setInterval(this.onTick.bind(this), opt.world.timestep*1000 );
	}

	reset(opt) {
		this.bodies.forEach((body)=>{
			let pos = body.initialPos;
			body.soul.resetPosition(pos[0], pos[1], pos[2]);

			if(body.initialRot) {
				if(body.initialRot === 'rand') {
					body.soul.resetRotation(this._randRot(), this._randRot(), this._randRot());
				} else {
					let rot = body.initialRot;
					body.soul.resetRotation(rot[0], rot[1], rot[2]);
				}
			}
		});
	}

	onTick() {
		this.world.step();

		let anims = [];
		this.bodies.forEach((body)=>{
			if(body.ref) {
				anims.push({
					ref: body.ref,
					position: body.soul.getPosition(),
					quaternion: body.soul.getQuaternion()
				});
			}
		});
		postMessage({
			bodies: anims
		});
	}

	_randRot() {
		return Math.floor(Math.random() * 90);
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
