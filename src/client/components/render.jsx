
/****************************************************************************************

	Copyright (c) 2017, Juan Carlos Labrandero.
	For conditions of distribution and use, see copyright notice in LICENSE

****************************************************************************************/

import React from 'react';

//var THREE = require('three');
//var TrackballControls = require('three-trackballcontrols');

/****************************************************************************************/

/*class World {
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
		this.camera = new THREE.PerspectiveCamera(45, view.width / view.height, 1, 10000);
		this.camera.position.z = 1000;
		this.camera.position.y = 1000;

		this.trackball = new TrackballControls(this.camera, params.element);





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





		this.physics = new Worker('/js/fislab.physics-worker.min.js');
		this.physics.onmessage = this.onPhysicsUpdate.bind(this);
		this.physics.postMessage({action: 'create', dt: 1/60});

		this.renderer = new THREE.WebGLRenderer();
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

		//this.world.step();
		if(this.trackball) {
			this.trackball.update();
		}



		//this.box.position.copy(this.boxBody.getPosition());

		this.renderer.setSize(view.width, view.height);
		this.renderer.render(this.scene, this.camera);

		requestAnimationFrame(this.render.bind(this));
	}

	reset() {
		this.physics.postMessage({action: 'reset'});
	}

	onPhysicsUpdate(e) {
		this.box.position.copy(e.data.box1.position);
		this.box.quaternion.copy(e.data.box1.quaternion);
	}
}*/

class Timekeeper extends React.Component {
	constructor(props) {
		super(props);

		this.clock = {
			m: 0, s: 0, c: 0
		};
	}

	componentDidMount() {

	}

	play() {
		this.control = setInterval(this.onClock.bind(this), 10);
	}

	stop() {
		clearInterval(this.control);
	}

	onClock() {
		if (this.clock.c < 99) {
			this.clock.c++;
			if (this.clock.c < 10) { this.clock.c = '0'+this.clock.c; }
			this.refs.cen.innerHTML = ':'+this.clock.c;
		}
		if (this.clock.c == 99) {
			this.clock.c = -1;
		}
		if (this.clock.c == 0) {
			this.clock.s ++;
			if (this.clock.s < 10) { this.clock.s = '0'+this.clock.s; }
			this.refs.sec.innerHTML = ':'+this.clock.s;
		}
		if (this.clock.s == 59) {
			this.clock.s = -1;
		}
		if ( (this.clock.c == 0)&&(this.clock.s == 0) ) {
			this.clock.m++;
			if (this.clock.m < 10) { this.clock.m = '0'+this.clock.m; }
			this.refs.min.innerHTML = ':'+this.clock.m;
		}
		if (this.clock.m == 59) {
			this.clock.m = -1;
		}
	}

	render() {
		return (
			<div className="">
				<div ref="min" className="timekeeper-label">00</div>
				<div ref="sec" className="timekeeper-label">:00</div>
				<div ref="cen" className="timekeeper-label">:00</div>
			</div>
		);
	}
}

class Renderer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			status: 'stop'
		};
	}

	componentDidMount() {
		let element = this.refs.viewport;
		this.loadScript('/js/fislab.render-worker.min.js', ()=>{
			//console.log(window.fislab);
			this.renderer = new window.fislab.RenderEngine;
			this.physics = new Worker('/js/fislab.physics-worker.min.js');

			this.renderer.create({viewElement: element});

			this.physics.onmessage = this.onPhysicsUpdate.bind(this);
			this.physics.postMessage({action: 'create', dt: 1/60});
		});
	}

	loadScript(url, callback){
		var script = document.createElement('script');
		script.type = 'text/javascript';

		if(script.readyState){  //IE
			script.onreadystatechange = function(){
				if(script.readyState == 'loaded' || script.readyState == 'complete'){
					script.onreadystatechange = null;
					callback();
				}
			};
		} else {  //Others
			script.onload = function(){
				setTimeout(()=>{
					callback();
				}, 2000);
			};
		}

		script.src = url;
		//document.getElementsByTagName('head')[0].appendChild(script);
		document.body.appendChild(script);
	}

	onStartStop() {
		switch (this.state.status) {
		case 'play':
			this.refs.timer.stop();
			this.setState({status: 'stop'});
			break;
		case 'stop':
			this.refs.timer.play();
			this.physics.postMessage({action: 'reset'});
			this.setState({status: 'play'});
			break;
		default:
			break;
		}
	}

	onPhysicsUpdate(e) {
		this.renderer.update(e.data);
	}

	render() {
		let IconStop = this.props.stopIcon,
			IconPlay = this.props.playIcon;

		return (
			<div className="render">
				<div ref="viewport" className="render-container">
					Cargando
				</div>
				{/*<div className="render-controls">
					<button className="render-control-start" onClick={this.onStartStop.bind(this)}>
						{
							//this.state.status === 'play' ? <IconStop style={{width: '1rem', fill: 'white'}}/> : null
						}
						{
							//this.state.status === 'stop' ? <IconPlay style={{width: '1rem', fill: 'white'}}/> : null
						}
						click
					</button>
					<Timekeeper ref="timer"/>
				</div>*/}
			</div>
		);
	}
}

export {Renderer};
