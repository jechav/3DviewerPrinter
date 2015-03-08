//(function() {

	if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

	var container, stats;

	var camera, cameraTarget, scene, renderer;
	var mesh;
	var scale = 0.01;

	init();
	animate();

	function init() {

		container = document.getElementById('mainCanvas');

		camera = new THREE.PerspectiveCamera( 35, 488 / 540, 1, 15 );
		camera.position.set( 3, 0.15, 3 );

		cameraTarget = new THREE.Vector3( 0, -0.25, 0 );

		scene = new THREE.Scene();
		scene.fog = new THREE.Fog( 0xeae9ed, 2, 15 );


	// Ground

	// var plane = new THREE.Mesh(
	// 	new THREE.PlaneBufferGeometry( 40, 40 ),
	// 	new THREE.MeshPhongMaterial( { ambient: 0xeae9ed, color: 0xeae9ed, specular: 0xeae9ed } )
	// 	);

	// plane.rotation.x = -Math.PI/2;
	// plane.position.y = -0.5;
	// scene.add( plane );

	//plane.receiveShadow = true;


	// ASCII file

	var loader = new THREE.STLLoader();

	loader.load( 'phoneModels/iphone.stl', function( geometry ) {

		var material = new THREE.MeshPhongMaterial( { ambient: 0x1c7434 , color: 0x1c7434 , specular: 0x111111, shininess: 200 } );
		mesh = new THREE.Mesh( geometry, material );

		mesh.position.set( 0, 0, 0 );
		//mesh.rotation.set( 0, - Math.PI / 2, 0 );
		mesh.scale.set( scale, scale, scale );

		mesh.rotateOnAxis(new THREE.Vector3( 0, 0, 1 ), -Math.PI /2)

		mesh.castShadow = true;
		//mesh.receiveShadow = true;

		scene.add( mesh );

	});
	//////////////////////////// TELEFONO

	$('.btn-phones').on('click', '.get-inspired', function(e) {
			e.preventDefault();
	        //alert('Parameter: ' + $(this).children('input').attr('value'));
	        
	        var val = $(this).children('input').attr('value');
	        var stlFile = '';
	        
	        if(val==1){
	        	stlFile = 'iPhoneCase.stl'; 
	        }else if(val==2){
	        	stlFile = 'iPhone51_fixed.stl';
	        }else{
	        	stlFile = 'iphone.stl'; 
	        }
        	
        	loader.load( 'phoneModels/'+stlFile, function( geometry ) {
        		scene.remove(mesh);
        		var material = new THREE.MeshPhongMaterial( { ambient: 0x1c7434 , color: 0x1c7434 , specular: 0x111111, shininess: 200 } );
        		mesh = new THREE.Mesh( geometry, material );

        		mesh.position.set( 0, 0, 0 );
        		//mesh.rotation.set( 0, - Math.PI / 2, 0 );
        		mesh.scale.set( scale, scale, scale );

        		mesh.rotateOnAxis(new THREE.Vector3( 0, 0, 1 ), -Math.PI /2)

        		mesh.castShadow = true;
        		//mesh.receiveShadow = true;

        		scene.add( mesh );

        	});

        	//animate();
	        return;
	    });

	/////////////////////////////

	//////////////////////////// COLOR

	$('.button-group').on('click', 'button', function(e) {
	        //alert('Parameter: ' + $(this).children('input').attr('value'));
	        
	        var val = $(this).attr('color');
	        var setColor = val.replace('#', '0x');
	        console.log(val);
	        mesh.material.color.setHex( val.replace('#', '0x') );
	        mesh.material.ambient.setHex( val.replace('#', '0x') );
	        mesh.material.specular.setHex( val.replace('#', '0x') );
        	
        	// loader.load( 'phoneModels/'+stlFile, function( geometry ) {
        	// 	scene.remove(mesh);
        	// 	var material = new THREE.MeshPhongMaterial( { ambient: 0xff5533, color: 0xff5533, specular: 0x111111, shininess: 200 } );
        	// 	mesh = new THREE.Mesh( geometry, material );

        	// 	mesh.position.set( 0, 0, 0 );
        	// 	//mesh.rotation.set( 0, - Math.PI / 2, 0 );
        	// 	mesh.scale.set( scale, scale, scale );

        	// 	mesh.rotateOnAxis(new THREE.Vector3( 0, 0, 1 ), -Math.PI /2)

        	// 	mesh.castShadow = true;
        	// 	//mesh.receiveShadow = true;

        	// 	scene.add( mesh );

        	// });

        	//animate();
	        return;
	    });

	/////////////////////////////

	scene.add( new THREE.DirectionalLight( 0xffffff ) );

	addShadowedLight( 1, 1, 1, 0xeae9ed, 1.35 );
	addShadowedLight( 0.5, 1, -1, 0xeae9ed, 1 );

	// renderer

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setClearColor( scene.fog.color );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( 480, 540 );

	renderer.gammaInput = true;
	renderer.gammaOutput = true;

	renderer.shadowMapEnabled = true;
	renderer.shadowMapCullFace = THREE.CullFaceBack;

	container.appendChild( renderer.domElement );

	// stats

	// stats = new Stats();
	// stats.domElement.style.position = 'absolute';
	// stats.domElement.style.top = '0px';
	// container.appendChild( stats.domElement );

	//

	//window.addEventListener( 'resize', onWindowResize, false );
	}

	function addShadowedLight( x, y, z, color, intensity ) {

		var directionalLight = new THREE.DirectionalLight( color, intensity );
		directionalLight.position.set( x, y, z )
		scene.add( directionalLight );

		directionalLight.castShadow = true;
		// directionalLight.shadowCameraVisible = true;

		var d = 1;
		directionalLight.shadowCameraLeft = -d;
		directionalLight.shadowCameraRight = d;
		directionalLight.shadowCameraTop = d;
		directionalLight.shadowCameraBottom = -d;

		directionalLight.shadowCameraNear = 1;
		directionalLight.shadowCameraFar = 4;

		directionalLight.shadowMapWidth = 1024;
		directionalLight.shadowMapHeight = 1024;

		directionalLight.shadowBias = -0.005;
		directionalLight.shadowDarkness = 0.15;

	}

	function onWindowResize() {

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );

	}

	function animate() {

		requestAnimationFrame( animate );

		render();
		//stats.update();

	}

	function render() {

		var timer = Date.now() * 0.0005;

		camera.position.x = Math.cos( timer ) * 3;
		camera.position.z = Math.sin( timer ) * 3;

		camera.lookAt( cameraTarget );

		renderer.render( scene, camera );

	}

//})();