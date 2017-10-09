
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import React from 'react';

var THREE = require('three');

/****************************************************************************************/

class World {
	constructor(props) {

	}

	init(params) {
		this.params = params;

		let view = {
			width: this.params.element.offsetWidth,
			height: this.params.element.offsetHeight
		};
		
		this.clock = new THREE.Clock();

		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(75, view.width / view.height, 1, 10000);
		this.camera.position.z = 500;
		this.camera.position.y = 100;
		


		var sphere = new THREE.SphereGeometry(10, 8, 8);
		this.light1 = new THREE.PointLight(0xff0040, 1, 500);
		this.light1.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xff0040 })));
		
		this.scene.add(this.light1);
		this.light1.position.y = 200;


		var boxGeo = new THREE.BoxGeometry(100, 100, 100);
		var boxMat = new THREE.MeshPhongMaterial({color: 0xffffff});
		var box = new THREE.Mesh(boxGeo, boxMat);
		//box.castShadow = true;
		//box.receiveShadow = true;
		this.scene.add(box);



		this.renderer = new THREE.WebGLRenderer();
		//this.renderer.setSize(view.width, view.height);
		this.renderer.domElement.classList.add('render-view');

		params.element.appendChild(this.renderer.domElement);

		this.render();
	}

	render() {
		let view = {
			width: this.params.element.offsetWidth,
			height: this.params.element.offsetHeight
		};

		var time = Date.now() * 0.0005;
		var delta = this.clock.getDelta();


		this.light1.position.x = Math.sin( time ) * 200;
		//this.light1.position.y = Math.cos( time * 0.5 ) * 150;
		this.light1.position.z = Math.cos( time ) * 200;

		//this.camera.aspect = view.width/view.height;

		this.renderer.setSize(view.width, view.height);
		this.renderer.render(this.scene, this.camera);

		requestAnimationFrame(this.render.bind(this));
	}
}

class Renderer extends React.Component {
	constructor(props) {
		super(props);

		this.world = new World;
	}

	componentDidMount() {
		let element = this.refs.viewport;

		/*console.log(element.offsetWidth, element.offsetHeight);
		window.addEventListener("resize", ()=>{
			console.log(element.offsetWidth, element.offsetHeight);
		});*/

		this.world.init({element});
	}

	render() {
		return (
			<div>
				<div ref="viewport" className="render-container">
				</div>
			</div>
		);
	}
}

export {Renderer};