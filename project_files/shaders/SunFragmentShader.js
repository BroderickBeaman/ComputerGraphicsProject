// Fragment shader source
var FSHADER_SOURCE_SUN = 
	'#ifdef GL_ES\n' +
	'precision mediump float;\n' +
	'#endif\n' +
	'varying vec4 v_Color;\n' +
	'void main() {\n' +
	'  gl_FragColor = v_Color;\n' +
	'}\n';