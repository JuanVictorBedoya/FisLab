
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

	create(opt, onProgress) {
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

		this.meshes = {};




		/*var model = new THREE.JSONLoader();
		model.load('/models/table.json', (geo, mat)=>{
			var textureLoader = new THREE.TextureLoader();
			textureLoader.load('/textures/table.png', (texture)=>{
				var modelMaterial = new THREE.MeshPhongMaterial(
					{ shininess: 255, map: texture, emissive: 0x151515, specular: 0x050505, color: 0xffffff }
				);

				var fl_table = new THREE.Mesh(geo, modelMaterial);
				fl_table.position.y = -1034;
				this.scene.add(fl_table);
			});
		},
		(xhr)=>{
			console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
		}
	);*/

		var sphere = new THREE.SphereGeometry(10, 8, 8);
		this.light1 = new THREE.PointLight(0xffffff, 1, 10000);
		this.light1.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xffffff })));

		this.scene.add(this.light1);
		this.light1.position.y = 2000;

		/*var groundGeo = new THREE.PlaneBufferGeometry(4702, 1380);
		var groundMat = new THREE.MeshPhongMaterial({color: 0xffffff, specular: 0x050505});
		//groundMat.color.setHSL(0.095, 1, 0.75);
		var ground = new THREE.Mesh(groundGeo, groundMat);
		ground.rotation.x = -Math.PI/2;
		ground.position.y = 0;
		this.scene.add(ground);*/
		//ground.receiveShadow = true;

		/*var boxGeo = new THREE.BoxGeometry(100, 100, 100);
		var boxMat = new THREE.MeshPhongMaterial({color: 0xffffff});
		this.box = new THREE.Mesh(boxGeo, boxMat);
		//box.castShadow = true;
		//box.receiveShadow = true;
		this.scene.add(this.box);*/


		let loadPercent = 0.0;
		if(opt.scene.geometries) {
			let wPerc = 10.0 / parseFloat(opt.scene.geometries.length);
			opt.scene.geometries.forEach((geo)=>{
				var geometry, material, mesh;
				switch(geo.type) {
				case 'box':
					geometry = new THREE.BoxGeometry(geo.width, geo.height, geo.depth);
					material = new THREE.MeshPhongMaterial(geo.material);
					break;

				case 'cylinder':
					geometry = new THREE.CylinderGeometry(geo.radiusTop, geo.radiusBottom, geo.height, geo.radiusSegments, geo.heightSegments, geo.openEnded, geo.thetaStart, geo.thetaLength);
					material = new THREE.MeshPhongMaterial(geo.material);
					break;
				}

				mesh = new THREE.Mesh(geometry, material);

				if(geo.position){
					let pos = geo.position;
					mesh.position.copy(new THREE.Vector3(pos[0], pos[1], pos[2]));
				}

				this.meshes[geo.name] = mesh;
				this.scene.add(mesh);

				loadPercent += wPerc;
				onProgress ? onProgress({percent: loadPercent}) : null;
			});
		} else {
			loadPercent += 10.0;
		}

		if(opt.scene.models) {
			let wPerc = 90.0 / parseFloat(opt.scene.models.length);
			opt.scene.models.forEach((model)=>{
				let jsonLoader = new THREE.JSONLoader(),
					textureLoader = new THREE.TextureLoader(),
					addMesh = function(world, geo, mat) {
						let mesh = new THREE.Mesh(geo, mat);

						if(model.position){
							let pos = model.position;
							mesh.position.copy(new THREE.Vector3(pos.x, pos.y, pos.z));
						}

						world.meshes[model.name] = mesh;
						world.scene.add(mesh);
					},
					progress = function(xhr) {
						loadPercent += xhr.loaded / xhr.total * wPerc;
						onProgress ? onProgress({percent: loadPercent}) : null;
					};

				jsonLoader.load(model.resourceName,
					(geo, mat)=>{
						if(model.textureMap) {
							wPerc = wPerc / 2.0;
							textureLoader.load(model.textureMap,
								(texture)=>{
									if(model.material) {
										model.material.map = texture;
									}
									else {
										model.material = { map: texture };
									}
									addMesh(this, geo, new THREE.MeshPhongMaterial(model.material));
								}, progress, (error)=>{});
						} else if(model.material) {
							addMesh(this, geo, new THREE.MeshPhongMaterial(model.material));
						} else {
							addMesh(this, geo, mat);
						}
					}, progress, (error)=>{});
			});
		} else {
			loadPercent += 90.0;
		}






		this.ray1 = new THREE.Raycaster(new THREE.Vector3(100, 500, 0), new THREE.Vector3(-1, 0, 0));
		this.ray2 = new THREE.Raycaster(new THREE.Vector3(100, 100, 0), new THREE.Vector3(-1, 0, 0));
		this.ray1.enabled = true;
		this.ray2.enabled = true;
		this.tests = {
			one: opt.onTest1,
			two: opt.onTest2
		};
		//console.log(this.ray1);

		this.renderer = new THREE.WebGLRenderer({antialias: true});
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

		data.bodies.forEach((body)=>{
			let mesh = this.meshes[body.ref];
			mesh.position.copy(body.position);
			mesh.quaternion.copy(body.quaternion);
		});
		//this.box.position.copy(data.box1.position);
		//this.box.quaternion.copy(data.box1.quaternion);


		/*if(this.ray1.enabled) {
			let intersect = this.ray1.intersectObject(this.box);
			if(intersect.length > 0) {
				this.ray1.enabled = false;
				this.tests.one();
			}
		}
		if(this.ray2.enabled) {
			let intersect = this.ray2.intersectObject(this.box);
			if(intersect.length > 0) {
				this.ray2.enabled = false;
				this.tests.two();
			}
		}*/

	}

	testReset() {
		this.ray1.enabled = this.ray2.enabled = true;

	}
}

/****************************************************************************************/

window.fislab.RenderEngine = RenderEngine;
