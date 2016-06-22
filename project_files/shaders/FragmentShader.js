// Fragment shader source
var FSHADER_SOURCE = [];
FSHADER_SOURCE[0] = 
	'#ifdef GL_ES\n' +
	'precision mediump float;\n' +
	'#endif\n' +
	'uniform vec3 u_LightColor;\n' +     // Light color
	'uniform vec3 u_LightPosition;\n' +  // Position of the light source
	'uniform vec3 u_AmbientLight;\n' +   // Ambient light color
	'varying vec3 v_Normal;\n' +
	'varying vec3 v_Position;\n' +
	'varying vec4 v_Color;\n' +
	'void main() {\n' +
	   // Normalize the normal because it is interpolated and not 1.0 in length any more
	'  vec3 normal = normalize(v_Normal);\n' +
    // Calculate the light direction and make it 1.0 in length
	'  vec3 lightDirection = normalize(u_LightPosition - v_Position);\n' +
    // The dot product of the light direction and the normal
	'  float nDotL = max(dot(lightDirection, normal), 0.0);\n' +
	// Calculate the final color from diffuse reflection and ambient reflection
	'  vec3 diffuse = u_LightColor * v_Color.rgb * nDotL;\n' +
	'  vec3 ambient = u_AmbientLight * v_Color.rgb;\n' +
	'  gl_FragColor = vec4(diffuse + ambient, v_Color.a);\n' +
	'}\n';

FSHADER_SOURCE[1] = 
	'#ifdef GL_ES\n' +
	'precision mediump float;\n' +
	'#endif\n' +
	'uniform vec3 u_LightColor[2];\n' +     // Light color
	'uniform vec3 u_LightPosition[2];\n' +  // Position of the light source
	'uniform vec3 u_AmbientLight;\n' +   // Ambient light color
	'varying vec3 v_Normal;\n' +
	'varying vec3 v_Position;\n' +
	'varying vec4 v_Color;\n' +
	'void main() {\n' +
	   // Normalize the normal because it is interpolated and not 1.0 in length any more
	'  vec3 normal = normalize(v_Normal);\n' +
	'  vec3 diffuse = vec3(0.0, 0.0, 0.0);\n' +
	'  vec3 lightDirection;\n' +
	'  for( int i = 0; i < 2; i++){\n' +
	    // Calculate the light direction and make it 1.0 in length
		'  lightDirection = normalize(u_LightPosition[i] - v_Position);\n' +
	    // The dot product of the light direction and the normal
		'  diffuse += max(dot(lightDirection, normal), 0.0) * u_LightColor[i];\n' +
		// Calculate the final color from diffuse reflection and ambient reflection
	'  }\n' +
	'  vec3 ambient = u_AmbientLight * v_Color.rgb;\n' +
	'  gl_FragColor = vec4((diffuse + ambient) * v_Color.rgb, v_Color.a);\n' +
	'}\n';
