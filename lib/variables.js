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

var currentCamera = 1;
var cx= -3.0;
var cy= 15.0;
var cz = 8;
var elev=  -60.0;
var angle = 0.0;

var texture;

//Light params
var lightColor = [1.0, 1.0, 1.0];
var lightPos = [-3.0, 8.5, 2.0];
var lightDecay = 0;
var lightTarget = 1;

  
var lightPosLocation;
var lightTargetLocation;
var lightDecayLocation;
var lightColorHandle;
var materialDiffColorHandle;

//
// Models Vars
//
var models = {};

//Base initial position
var baseX = -3;
var baseY = 1;
var baseZ = -1;
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

var currentPx = -3;
var currentPy = 6;
var currentPz = 3;
var currentTurn = 1;

var flag = 0;
var gameEnded = false;
var draw = false;

var lastUpdateTime = (new Date).getTime();
var fluctuate = true;
var finalPosition = 6;

//Location
var positionAttributeLocation; 
var normalAttributeLocation;  
var matrixLocation;
var uvLocation;
var vertexMatrixPositionHandle;
var normalMatrixPositionHandle;
var textLocation;

var objects;
var objectsPositions;

var basePositionNode;
var baseNode;

var pieceP1PositionNode;
var pieceP1Node;

var pieceP2PositionNode;
var pieceP2Node;