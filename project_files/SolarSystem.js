function main() {
	// Retrieve <canvas> element
	var canvas = document.getElementById('webgl');

	// Get the rendering context for WebGL
	var gl = getWebGLContext(canvas);
	if (!gl) {
		console.log('Failed to get the rendering context for WebGL');
		return;
	}
  
	// Initialize shaders
	if (!initShaders(gl, VSHADER_SOURCE_SUN, FSHADER_SOURCE_SUN)) {
		console.log('Failed to initialize shaders.');
	}
  
	// Set the vertex coordinates and the color.
	var n = initVertexBuffers(gl);
	if (n < 0) {
		console.log('Failed to set the vertex information');
		return;
	}
	
	// Set clear color and enable the depth test
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.enable(gl.DEPTH_TEST);
	
	// Get the storage locations of uniform variables
	var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  	var u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
  	
  	// UNCOMMENT THIS BLOCK WHEN IMPLEMENTING LIGHTING
	//if (!u_ModelMatrix || !u_MvpMatrix) {
	//	console.log('Failed to get the storage location of one or more uniform variables');
	//	return;
	//}
	
	// Various matrices
	var modelMatrix = new Matrix4(); // Model Matrix
	var mvpMatrix = new Matrix4(); // Model View Projection Matrix
	
	// Pass the Model Matrix to u_ModelMatrix
	gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
	
	// Calculate the View Projection Matrix
	mvpMatrix.setPerspective(30, canvas.width/canvas.height, 1, 100);
	mvpMatrix.lookAt(0, 0, 6, 0, 0, 0, 0, 1, 0);
	mvpMatrix.multiply(modelMatrix);
	
	// Pass the model view projection matrix to u_MvpMatrix
	gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);
	
	// Clear color and depth buffer
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	// Draw the sphere(Note that the 3rd argument is the gl.UNSIGNED_SHORT)
	gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_SHORT, 0);
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
	
	// Write the vertex property to buffers
	if (!initArrayBuffer(gl, 'a_Position', new Float32Array(positions), gl.FLOAT, 3)) return -1;
	
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
	
	gl. bindBuffer(gl.ARRAY_BUFFER, null);
	
	return true;
}

