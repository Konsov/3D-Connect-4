var canvas;
var gl;

var path = window.location.pathname;
var page = path.split("/").pop();
var baseDir;
var shaderDir;

var vertexShader;
var fragmentShader;
var program;



var positionAttributeLocation;  
var matrixLocation;

var vao;

var positionBuffer;
var indexBuffer;

var cx= -3.0;
var cy= 7.0;
var cz = 4;
var elev=  -55.0;
var angle = 0.0;

var texture;

var uvLocation;
var uvBuffer;

var normalAttributeLocation;  
var materialDiffColorHandle;
var lightColorHandle;
var vertexMatrixPositionHandle;
var normalMatrixPositionHandle;

//Light params
var lightColor = [1.0, 1.0, 1.0];
var lightPos = [-3.0, 8.5, 2.0];
var lightTarget = 10;
var lightDecay = 0;
  
var lightPosLocation;
var lightTargetLocation;
var lightDecayLocation;

var normalBuffer;

//
// Models Vars
//
var models = {};

var image = new Image();
image.src ='models/texture/WoodM1.jpg';

// Base
var baseModel;
var baseModelSrc = 'models/base.obj';
var baseTextureSrc = 'models/texture/WoodM1.jpg';



var objects;

var basePositionNode;
var baseNode;