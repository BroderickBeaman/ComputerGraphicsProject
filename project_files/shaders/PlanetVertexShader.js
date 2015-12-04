// Vertex Shader Source
VSHADER_SOURCE[1] = // Mercury
	'attribute vec4 a_Position;\n' +
	'attribute vec4 a_Normal;\n' +
	'uniform mat4 u_MvpMatrix;\n' +
	'uniform mat4 u_ModelMatrix;\n' +  // Model matrix
	'uniform mat4 u_NormalMatrix;\n' +  // Transformation matrix of the normal
	'varying vec4 v_Color;\n' +
	'varying vec3 v_Normal;\n' +
	'varying vec3 v_Position;\n' +
	'void main() {\n' +
	'  vec4 color = vec4(0.71, 0.14, 0.07, 1.0);\n' +  // Sphere Color
	'  gl_Position = u_MvpMatrix * a_Position;\n' +
	   // Calculate the vertex position in the world coordinate
	'  v_Position = vec3(u_ModelMatrix * a_Position);\n' +
	'  v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
	'  v_Color = color;\n' +
	'}\n';

VSHADER_SOURCE[2] = // Venus
	'attribute vec4 a_Position;\n' +
	'attribute vec4 a_Normal;\n' +
	'uniform mat4 u_MvpMatrix;\n' +
	'uniform mat4 u_ModelMatrix;\n' +  // Model matrix
	'uniform mat4 u_NormalMatrix;\n' +  // Transformation matrix of the normal
	'varying vec4 v_Color;\n' +
	'varying vec3 v_Normal;\n' +
	'varying vec3 v_Position;\n' +
	'void main() {\n' +
	'  vec4 color = vec4(0.91, 0.76, 0.5, 1.0);\n' +  // Sphere Color
	'  gl_Position = u_MvpMatrix * a_Position;\n' +
	   // Calculate the vertex position in the world coordinate
	'  v_Position = vec3(u_ModelMatrix * a_Position);\n' +
	'  v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
	'  v_Color = color;\n' +
	'}\n';

VSHADER_SOURCE[3] = // Earth
	'attribute vec4 a_Position;\n' +
	'attribute vec4 a_Normal;\n' +
	'uniform mat4 u_MvpMatrix;\n' +
	'uniform mat4 u_ModelMatrix;\n' +  // Model matrix
	'uniform mat4 u_NormalMatrix;\n' +  // Transformation matrix of the normal
	'varying vec4 v_Color;\n' +
	'varying vec3 v_Normal;\n' +
	'varying vec3 v_Position;\n' +
	'void main() {\n' +
	'  vec4 color = vec4(0.2, 0.21, 0.60, 1.0);\n' +  // Sphere Color
	'  gl_Position = u_MvpMatrix * a_Position;\n' +
	   // Calculate the vertex position in the world coordinate
	'  v_Position = vec3(u_ModelMatrix * a_Position);\n' +
	'  v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
	'  v_Color = color;\n' +
	'}\n';

VSHADER_SOURCE[4] = // Mars
	'attribute vec4 a_Position;\n' +
	'attribute vec4 a_Normal;\n' +
	'uniform mat4 u_MvpMatrix;\n' +
	'uniform mat4 u_ModelMatrix;\n' +  // Model matrix
	'uniform mat4 u_NormalMatrix;\n' +  // Transformation matrix of the normal
	'varying vec4 v_Color;\n' +
	'varying vec3 v_Normal;\n' +
	'varying vec3 v_Position;\n' +
	'void main() {\n' +
	'  vec4 color = vec4(0.82, 0.22, 0.08, 1.0);\n' +  // Sphere Color
	'  gl_Position = u_MvpMatrix * a_Position;\n' +
	   // Calculate the vertex position in the world coordinate
	'  v_Position = vec3(u_ModelMatrix * a_Position);\n' +
	'  v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
	'  v_Color = color;\n' +
	'}\n';

VSHADER_SOURCE[5] = // Jupiter
	'attribute vec4 a_Position;\n' +
	'attribute vec4 a_Normal;\n' +
	'uniform mat4 u_MvpMatrix;\n' +
	'uniform mat4 u_ModelMatrix;\n' +  // Model matrix
	'uniform mat4 u_NormalMatrix;\n' +  // Transformation matrix of the normal
	'varying vec4 v_Color;\n' +
	'varying vec3 v_Normal;\n' +
	'varying vec3 v_Position;\n' +
	'void main() {\n' +
	'  vec4 color = vec4(0.7, 0.45, 0.21, 1.0);\n' +  // Sphere Color
	'  gl_Position = u_MvpMatrix * a_Position;\n' +
	   // Calculate the vertex position in the world coordinate
	'  v_Position = vec3(u_ModelMatrix * a_Position);\n' +
	'  v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
	'  v_Color = color;\n' +
	'}\n';

VSHADER_SOURCE[6] = // Saturn
	'attribute vec4 a_Position;\n' +
	'attribute vec4 a_Normal;\n' +
	'uniform mat4 u_MvpMatrix;\n' +
	'uniform mat4 u_ModelMatrix;\n' +  // Model matrix
	'uniform mat4 u_NormalMatrix;\n' +  // Transformation matrix of the normal
	'varying vec4 v_Color;\n' +
	'varying vec3 v_Normal;\n' +
	'varying vec3 v_Position;\n' +
	'void main() {\n' +
	'  vec4 color = vec4(0.97, 0.88, 0.31, 1.0);\n' +  // Sphere Color
	'  gl_Position = u_MvpMatrix * a_Position;\n' +
	   // Calculate the vertex position in the world coordinate
	'  v_Position = vec3(u_ModelMatrix * a_Position);\n' +
	'  v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
	'  v_Color = color;\n' +
	'}\n';

VSHADER_SOURCE[7] = // Uranus
	'attribute vec4 a_Position;\n' +
	'attribute vec4 a_Normal;\n' +
	'uniform mat4 u_MvpMatrix;\n' +
	'uniform mat4 u_ModelMatrix;\n' +  // Model matrix
	'uniform mat4 u_NormalMatrix;\n' +  // Transformation matrix of the normal
	'varying vec4 v_Color;\n' +
	'varying vec3 v_Normal;\n' +
	'varying vec3 v_Position;\n' +
	'void main() {\n' +
	'  vec4 color = vec4(0.25, 0.87, 0.88, 1.0);\n' +  // Sphere Color
	'  gl_Position = u_MvpMatrix * a_Position;\n' +
	   // Calculate the vertex position in the world coordinate
	'  v_Position = vec3(u_ModelMatrix * a_Position);\n' +
	'  v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
	'  v_Color = color;\n' +
	'}\n';

VSHADER_SOURCE[8] = // Neptune
	'attribute vec4 a_Position;\n' +
	'attribute vec4 a_Normal;\n' +
	'uniform mat4 u_MvpMatrix;\n' +
	'uniform mat4 u_ModelMatrix;\n' +  // Model matrix
	'uniform mat4 u_NormalMatrix;\n' +  // Transformation matrix of the normal
	'varying vec4 v_Color;\n' +
	'varying vec3 v_Normal;\n' +
	'varying vec3 v_Position;\n' +
	'void main() {\n' +
	'  vec4 color = vec4(0.44, 0.65, 0.98, 1.0);\n' +  // Sphere Color
	'  gl_Position = u_MvpMatrix * a_Position;\n' +
	   // Calculate the vertex position in the world coordinate
	'  v_Position = vec3(u_ModelMatrix * a_Position);\n' +
	'  v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
	'  v_Color = color;\n' +
	'}\n';

VSHADER_SOURCE[9] = // The MOON!
	'attribute vec4 a_Position;\n' +
	'attribute vec4 a_Normal;\n' +
	'uniform mat4 u_MvpMatrix;\n' +
	'uniform mat4 u_ModelMatrix;\n' +  // Model matrix
	'uniform mat4 u_NormalMatrix;\n' +  // Transformation matrix of the normal
	'varying vec4 v_Color;\n' +
	'varying vec3 v_Normal;\n' +
	'varying vec3 v_Position;\n' +
	'void main() {\n' +
	'  vec4 color = vec4(0.97, 0.97, 0.97, 1.0);\n' +  // Sphere Color
	'  gl_Position = u_MvpMatrix * a_Position;\n' +
	   // Calculate the vertex position in the world coordinate
	'  v_Position = vec3(u_ModelMatrix * a_Position);\n' +
	'  v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
	'  v_Color = color;\n' +
	'}\n';