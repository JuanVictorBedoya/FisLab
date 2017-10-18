
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

var THREE = require('three');
var TrackballControls = require('three-trackballcontrols');

/****************************************************************************************/

class RenderEngine {
	constructor() {

	}

	create(opt) {
		//let element = document.getElementById(opt.elementID);
		this.viewElement = opt.viewElement;

		let view = {
			width: this.viewElement.offsetWidth,
			height: this.viewElement.offsetHeight
		};

		this.clock = new THREE.Clock();

		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(45, view.width / view.height, 1, 10000);
		this.camera.position.z = 1000;
		this.camera.position.y = 1000;

		this.trackball = new TrackballControls(this.camera, this.viewElement);





		var sphere = new THREE.SphereGeometry(10, 8, 8);
		this.light1 = new THREE.PointLight(0xffffff, 1, 1000);
		this.light1.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xff0040 })));

		this.scene.add(this.light1);
		this.light1.position.y = 200;

		var groundGeo = new THREE.PlaneBufferGeometry(5000, 1000);
		var groundMat = new THREE.MeshPhongMaterial({color: 0xffffff, specular: 0x050505});
		groundMat.color.setHSL(0.095, 1, 0.75);
		var ground = new THREE.Mesh(groundGeo, groundMat);
		ground.rotation.x = -Math.PI/2;
		ground.position.y = 0;
		this.scene.add(ground);
		//ground.receiveShadow = true;

		var boxGeo = new THREE.BoxGeometry(100, 100, 100);
		var boxMat = new THREE.MeshPhongMaterial({color: 0xffffff});
		this.box = new THREE.Mesh(boxGeo, boxMat);
		//box.castShadow = true;
		//box.receiveShadow = true;
		this.scene.add(this.box);





		this.renderer = new THREE.WebGLRenderer();
		this.renderer.domElement.classList.add('render-view');

		this.viewElement.appendChild(this.renderer.domElement);
		this.render();
	}

	render() {

		var time = Date.now() * 0.0005;
		var delta = this.clock.getDelta();

		let view = {
			width: this.viewElement.offsetWidth,
			height: this.viewElement.offsetHeight
		};


		this.light1.position.x = Math.sin( time ) * 200;
		//this.light1.position.y = Math.cos( time * 0.5 ) * 150;
		this.light1.position.z = Math.cos( time ) * 200;

		this.trackball.update();

		this.renderer.setSize(view.width, view.height);
		this.renderer.render(this.scene, this.camera);

		requestAnimationFrame(this.render.bind(this));
	}

	update(data) {
		this.box.position.copy(data.box1.position);
		this.box.quaternion.copy(data.box1.quaternion);
	}
}

/****************************************************************************************/

window.fislab.RenderEngine = RenderEngine;
