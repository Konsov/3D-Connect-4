var canvas;
var gl;

var path = window.location.pathname;
var page = path.split("/").pop();
var baseDir;
var shaderDir;

var vertexShader;
var fragmentShader;
var program;



var normalBuffer;
var positionBuffer;
var indexBuffer;
var uvBuffer;

var vao;

var cx= -3.0;
var cy= 7.0;
var cz = 4;
var elev=  -55.0;
var angle = 0.0;

var texture;

//Light params
var lightColor = [1.0, 1.0, 1.0];
var lightPos = [-3.0, 8.5, 2.0];
var lightTarget = 10;
var lightDecay = 0;
  
var lightPosLocation;
var lightTargetLocation;
var lightDecayLocation;
var lightColorHandle;
var materialDiffColorHandle;


//
// Models Vars
//
var models = {};


// Base
var baseModel;
var baseModelSrc = 'models/base.obj';
var baseTexture = new Image();
baseTexture.src ='models/texture/WoodM1.jpg';

// Pieces
var pieceModel;
var pieceModelSrc = 'models/piece.obj';
var pieceP1Texture = new Image();
pieceP1Texture.src ='models/texture/WoodD1.jpg';

var pieceP2Texture = new Image();
pieceP2Texture.src ='models/texture/WoodL1.png';


var objects;

var basePositionNode;
var baseNode;

var pieceP1PositionNode;
var pieceP1Node;

var pieceP2PositionNode;
var pieceP2Node;