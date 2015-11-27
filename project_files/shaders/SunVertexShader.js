// Vertex Shader Source
var VSHADER_SOURCE_SUN = 
	'attribute vec4 a_Position;\n' +
	'uniform mat4 u_MvpMatrix;\n' +
	'uniform mat4 u_ModelMatrix;\n' +    // Model matrix
	'uniform vec3 u_LightPosition;\n' +  // Position of the light source
	'varying vec4 v_Color;\n' +
	'void main() {\n' +
	'  vec4 color = vec4(1.0, 1.0, 1.0, 1.0);\n' + // Sphere Color
	'  gl_Position = u_MvpMatrix * a_Position;\n' +
	'  vec4 vertexPosition = u_ModelMatrix * a_Position;\n' +
	'  vec3 lightDirection = normalize(u_LightPosition - vec3(vertexPosition));\n' +
	'  v_Color = vec4(1.0, 1.0, 1.0, color.a);\n' +
	'}\n';