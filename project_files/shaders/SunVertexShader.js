// Vertex Shader Source
var VSHADER_SOURCE = [];
VSHADER_SOURCE[0] = 
	'attribute vec4 a_Position;\n' +
	'attribute vec4 a_Normal;\n' +
	'uniform mat4 u_MvpMatrix;\n' +
	'uniform mat4 u_ModelMatrix;\n' +  // Model matrix
	'uniform mat4 u_NormalMatrix;\n' +  // Transformation matrix of the normal
	'varying vec4 v_Color;\n' +
	'varying vec3 v_Normal;\n' +
	'varying vec3 v_Position;\n' +
	'void main() {\n' +
	'  vec4 color = vec4(1.0, 1.0, 0, 1.0);\n' +  // Sphere Color
	'  gl_Position = u_MvpMatrix * a_Position;\n' +
	   // Calculate the vertex position in the world coordinate
	'  v_Position = vec3(u_ModelMatrix * a_Position);\n' +
	'  v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
	'  v_Color = color;\n' +
	'}\n';