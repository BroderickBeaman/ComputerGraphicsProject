
// Vertex shader source
var VSHADER_SOURCE = 
	'attribute vec4 a_Position;\n' +
	'uniform mat4 u_MvpMatrix;\n' +
	'uniform mat4 u_ModelMatrix;\n' +    // Model matrix
	'varying vec4 v_Color;\n' +
	'void main() {\n' +
	'  vec4 color = vec4(1.0, 1.0, 1.0, 1.0);\n' + // Sphere Color
	'  gl_Position = u_MvpMatrix * a_Position;\n' +
	'  vec4 vertexPosition = u_ModelMatrix * a_Position;\n' +
	'  v_Color = vec4(1.0, 1.0, 1.0, color.a);\n' +
	'}\n';

// Fragment shader source
var FSHADER_SOURCE = 
	'#ifdef GL_ES\n' +
	'precision mediump float;\n' +
	'#endif\n' +
	'varying vec4 v_Color;\n' +
	'void main() {\n' +
	'  gl_FragColor = v_Color;\n' +
	'}\n';
	
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
	if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
		console.log('Failed to initialize shaders.');
	}
  
	// Set the vertex coordinates and the color.
	var n = initVertexBuffers(gl);
	if (n < o) {
		console.log('Failed to set the vertex information');
	}
	
	// Set clear color and enable the depth test
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.enable(gl.DEPTH_TEST);
	
	// Get the storage locations of uniform variables
	var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
	var u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
	if (!u_ModelMatrix || !u_MvpMatrix) {
		console.log('Failed to get the storage location of one or more uniform variables');
		return;
	}
	
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
