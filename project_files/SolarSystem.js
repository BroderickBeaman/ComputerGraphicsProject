var program;

function main() {
	// Retrieve <canvas> element
	var canvas = document.getElementById('webgl');

	// Get the rendering context for WebGL
	var gl = getWebGLContext(canvas);
	if (!gl) {
		console.log('Failed to get the rendering context for WebGL');
		return;
	}
	
	var count = 0;
	
	var u_ModelMatrix = [];
  	var u_MvpMatrix = [];
  	var u_NormalMatrix = [];
  	var u_LightColor = [];
  	var u_LightPosition = [];
  	var u_AmbientLight = [];
	
	while( count < VSHADER_SOURCE.length)
	{
		// Initialize shaders
		program = initShaders(gl, VSHADER_SOURCE[count], FSHADER_SOURCE[count], count);
		
		// Set clear color and enable the depth test
		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.enable(gl.DEPTH_TEST);
	  	
		// Get the storage locations of uniform variables
		u_ModelMatrix[count] = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
	  	u_MvpMatrix[count] = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
	  	u_NormalMatrix[count] = gl.getUniformLocation(gl.program, 'u_NormalMatrix');
	  	u_LightColor[count] = gl.getUniformLocation(gl.program, 'u_LightColor');
	  	u_LightPosition[count] = gl.getUniformLocation(gl.program, 'u_LightPosition');
	  	u_AmbientLight[count] = gl.getUniformLocation(gl.program, 'u_AmbientLight');

	  	if(count){
		   	// Set the light color (white)
			gl.uniform3f(u_LightColor[count], 0.8, 0.8, 0.8);
			// Set the light direction (in the world coordinate)
			gl.uniform3f(u_LightPosition[count], 0.0, 0.0, 0.0);
			// Set the ambient light
			gl.uniform3f(u_AmbientLight[count], 0.2, 0.2, 0.2);
	  	}else{
		   	// Set the light color (white)
			gl.uniform3f(u_LightColor[count], 1.0, 0.5, 0);
			// Set the light direction (in the world coordinate)
			gl.uniform3f(u_LightPosition[count], 0, 0.8, 0.8);
			// Set the ambient light
			gl.uniform3f(u_AmbientLight[count], 1.0, 0.5, 0);
	  	}
	  	
	  	//Error if any of the shaders failed to initialize
	  	if (!u_ModelMatrix[count] || !u_MvpMatrix[count] || !u_NormalMatrix[count] || !u_LightColor[count] || !u_LightPosition[count]　|| !u_AmbientLight[count]) { 
	  	    console.log('Failed to get the storage location' + count);
	  	    return;
	  	}
	  	count++;
	}
	
	// Set the vertex coordinates and the color.
	var n = initVertexBuffers(gl);
	if (n < 0) {
		console.log('Failed to set the vertex information');
		return;
	}
    	
	var viewProjMatrix = new Matrix4(); // Model View Projection Matrix
	
	// Calculate the model matrix
	
	// Calculate the View Projection Matrix
	viewProjMatrix.setPerspective(30, canvas.width/canvas.height, 1, 100);
	viewProjMatrix.lookAt(0, 10, 14, 0, 0, 0, 0, 1, 0);
	
	// Register the event handler for keystrokes
	document.onkeydown = function(ev) { keydown(ev); };
	
	draw(gl, n, viewProjMatrix, u_ModelMatrix, u_MvpMatrix, u_NormalMatrix);
}

// Code to create a sphere
function initVertexBuffers(gl) {
	// Increase to make spheres more smooth
	var SPHERE_DIV = 13;
	
	var i, ai, si, ci;
	var j, aj, sj, cj;
	var p1, p2;
	
	var positions = [];
	var indices = [];
	
	// Generate coordinates
	for (j = 0; j <= SPHERE_DIV; j++) {
		aj = j * Math.PI / SPHERE_DIV;
		sj = Math.sin(aj);
		cj = Math.cos(aj);
		for (i = 0; i <= SPHERE_DIV; i++) {
			ai = i * 2 * Math.PI / SPHERE_DIV;
			si = Math.sin(ai);
			ci = Math.cos(ai);
			
			positions.push(si * sj); // X
			positions.push(cj); // Y
			positions.push(ci * sj); // Z
		}
	}
	
	// Generate indices
	for (j = 0; j < SPHERE_DIV; j++) {
		for (i = 0; i < SPHERE_DIV; i++) {
			p1 = j * (SPHERE_DIV + 1) + i;
			p2 = p1 + (SPHERE_DIV + 1);
			
			indices.push(p1);
			indices.push(p2);
			indices.push(p1 + 1);
			
			indices.push(p1 + 1);
			indices.push(p2);
			indices.push(p2 + 1);
		}
	}
	
	// Write the vertex property to buffers (coordinates and normals)
	// Same data can be used for vertex and normal
	// In order to make it intelligible, another buffer is prepared separately
	if (!initArrayBuffer(gl, 'a_Position', new Float32Array(positions), gl.FLOAT, 3)) return -1;
	if (!initArrayBuffer(gl, 'a_Normal', new Float32Array(positions), gl.FLOAT, 3))  return -1;
	
	// Unbind the buffer object
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
	
	// Write the indices to the buffer object
	var indexBuffer = gl.createBuffer();
	
	if (!indexBuffer) {
		console.log('Failed to create the buffer object');
		return -1;
	}
	
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
	
	return indices.length;
}

function initArrayBuffer(gl, attribute, data, type, num) {
	// Create a buffer object
	var buffer = gl.createBuffer();
	if (!buffer) {
		console.log('Failed to create the buffer object');
		return false;
	}
	
	// Write data into the buffer object
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
	
	// Assign the buffer object to the attribute variable
	var a_attribute = gl.getAttribLocation(gl.program, attribute);
	if (a_attribute < 0) {
		console.log('Failed to get the storage location of ' + attribute);
		return false;
	}
	
	gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
	
	// Enable the assignment of the buffer object to the attribute variable
	gl.enableVertexAttribArray(a_attribute);
	
	return true;
}

//*********************************************************************
//* Orbital Values                                                    *
//*********************************************************************

// Coordinate transformation matrices
var g_modelMatrix = new Matrix4(), g_mvpMatrix = new Matrix4();

// Relative scale of the sun
var sunScale = 0.2;

// How large is the sun vs the planets (globally)
var sunToPlanetScale = 3;
var sunToPlanetScaleStep = 0.1;

// Overall speed of the orbits
var globalOrbitVelocity = 1;
var globalOrbitVelocityStep = 0.1;

// Global scale of orbital distances
var globalOrbitDistance = 3;
var globalOrbitDistanceStep = 0.1;

var planetOrbitAngle = [];
// Angles of rotation around the sun
planetOrbitAngle[0] = 0;
planetOrbitAngle[1] = 0;
planetOrbitAngle[2] = 0;
planetOrbitAngle[3] = 0;
planetOrbitAngle[4] = 0;
planetOrbitAngle[5] = 0;
planetOrbitAngle[6] = 0;
planetOrbitAngle[7] = 0;

var planetOrbitVelocity = [];
// Planetary orbit velocities
planetOrbitVelocity[0] = 4.16; // Mercury's actual orbital velocity (relative to Earth)
planetOrbitVelocity[1] = 1.62; // Venus' actual orbital velocity (relative to Earth)
planetOrbitVelocity[2] = 1; // Earth's orbital velocity
planetOrbitVelocity[3] = 0.532; // Mars' actual orbital velocity (relative to Earth)
planetOrbitVelocity[4] = 0.084; // Jupiter's actual orbital velocity (relative to Earth)
planetOrbitVelocity[5] = 0.04; // Saturns actual orbital velocity (relative to Earth)
planetOrbitVelocity[6] = 0.012; // Uranus' actual orbital velocity (relative to Earth)
planetOrbitVelocity[7] = 0.006; // Neptune's actual orbital velocity (relative to Earth)

var planetOrbitDistance = [];
// Planetary orbit distances
planetOrbitDistance[0] = 0.38; // Mercury's average orbital distance (in AU)
planetOrbitDistance[1] = 0.723; // Venus' average orbital distance (in AU)
planetOrbitDistance[2] = 1; // Earth's average orbital distance (in AU)
planetOrbitDistance[3] = 1.45; // Mars' average orbital distance (in AU)
planetOrbitDistance[4] = 5.075; // Jupiter's average orbital distance (in AU)
planetOrbitDistance[5] = 9.575; // Saturn's average orbital distance (in AU)
planetOrbitDistance[6] = 19.22; // Uranus' average orbital distance (in AU)
planetOrbitDistance[7] = 30; // Neptune's average orbital distance (in AU)

function draw(gl, n, viewProjMatrix, u_ModelMatrix, u_MvpMatrix, u_NormalMatrix) {

	if (globalOrbitVelocity < 0) {
		globalOrbitVelocity = 0;
	}

	// Recompute planetary rotation angles
	var i = 0;
	do{
		planetOrbitAngle[i] = (planetOrbitAngle[i] + (planetOrbitVelocity[i] * globalOrbitVelocity)) % 360;
	}while(++i < planetOrbitAngle.length)
	
	// Clear color and depth buffer
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	g_modelMatrix.setIdentity();
	
	i = 0;
	
	// Draw the sun
	gl.useProgram(program[i]);
	gl.program = program[i];
	drawSphere(gl, n, sunScale, viewProjMatrix, u_ModelMatrix[i],  u_MvpMatrix[i], u_NormalMatrix[i]);
	
	while(++i < program.length){

		gl.useProgram(program[i]);
		gl.program = program[i];
		
		// Draw planet i
		pushMatrix(g_modelMatrix);
		g_modelMatrix.rotate(planetOrbitAngle[i-1], 0, 1, 0);
		g_modelMatrix.translate(planetOrbitDistance[i-1] * globalOrbitDistance, 0, 0);
		drawSphere(gl, n, sunScale/sunToPlanetScale, viewProjMatrix, u_ModelMatrix[i], u_MvpMatrix[i], u_NormalMatrix[i]);
		g_modelMatrix = popMatrix();
	}
	
	// Recursive call happens every 1/60 of a second (60 fps)
	setTimeout(function() {
		draw(gl, n, viewProjMatrix, u_ModelMatrix, u_MvpMatrix, u_NormalMatrix);
	}, 1000/60);
}

var g_matrixStack = []; // Array for storing matrices
function pushMatrix(m) { // Store a matrix
	var m2 = new Matrix4(m);
	g_matrixStack.push(m2);
}

function popMatrix() { // Retrieve a stored matrix
	return g_matrixStack.pop();
}

var g_normalMatrix = new Matrix4(); // The normal matrix

function drawSphere(gl, n, scale, viewProjMatrix, u_ModelMatrix, u_MvpMatrix, u_NormalMatrix) {
	pushMatrix(g_modelMatrix); // Save the state of the current model matrix
	g_modelMatrix.scale(scale, scale, scale); // Resize the sphere
	
	// Pass the model matrix to u_ModelMatrix
	gl.uniformMatrix4fv(u_ModelMatrix, false, g_modelMatrix.elements);
	
	// Calculate MVP matrix
	g_mvpMatrix.set(viewProjMatrix);
	g_mvpMatrix.multiply(g_modelMatrix);
	gl.uniformMatrix4fv(u_MvpMatrix, false, g_mvpMatrix.elements);
	
	// Calculate the normal matrix
	g_normalMatrix.setInverseOf(g_modelMatrix);
	g_normalMatrix.transpose();
	gl.uniformMatrix4fv(u_NormalMatrix, false, g_normalMatrix.elements);
	
	// Draw
	gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_SHORT, 0);
	g_modelMatrix = popMatrix();  // Retrieve the old model matrix
}

function keydown(ev) {
	switch (ev.keyCode) {
		case 81 : // Q: Decrease the demo speed
			globalOrbitVelocity -= globalOrbitVelocityStep;
			console.log('Global orbit velocity = ' + globalOrbitVelocity);
			break;
		case 87 : // W: Increase the demo speed
			globalOrbitVelocity += globalOrbitVelocityStep;
			console.log('Global orbit velocity = ' + globalOrbitVelocity);
			break;
		case 65 : // A: Globally give the planets a tighter orbit
			globalOrbitDistance -= globalOrbitDistanceStep;
			console.log('Global orbit distance scale = ' + globalOrbitDistance);
			break;
		case 83 : // S: Globally give the planets a wider orbit
			globalOrbitDistance += globalOrbitDistanceStep;
			console.log('Global orbit distance scale = ' + globalOrbitDistance);
			break;
		case 90 : // Z: Shrink the planets relative to the sun
			sunToPlanetScale -= sunToPlanetScaleStep;
			console.log('Sun to planet scale = ' + sunToPlanetScale);
			break;
		case 88 : // X: Grow the planets relative to the sun
			sunToPlanetScale += sunToPlanetScaleStep;
			console.log('Sun to planet scale = ' + sunToPlanetScale);
			break;
		default : return; // No action
	}
}








