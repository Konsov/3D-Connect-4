//INITIALIZATION and SETTING DEFAULT VALUE OF ALL GLOBAL VARIABLES USED IN THE PROJECT
// General variable to semplify some call
var path = window.location.pathname;
var page = path.split("/").pop();
var baseDir;
var shaderDir;

//Variable used for canvas, webgl and grafical use
var canvas;
var gl;

var vertexShader;
var fragmentShader;
var program;

var normalBuffer;
var positionBuffer;
var indexBuffer;
var uvBuffer;

//variable used for texture processing (app.js)
var texture;

var vao;

//Variable and Defaused for Eyepostion and then CameraView
var currentCamera = 1; // 5 Type of presetted cameras, one for each side of the board and the last from above
var cx= -3.0;
var cy= 15.0;
var cz = 8;
var elev=  -60.0;
var angle = 0.0;

//DEFAULT LIGHTS AND REFLECTIONS SETTINGS
//Default Settings;
var lightModel = 1; // 0 direct, 1 point, 2 spot
var ambientLight = 2; // 0 ambient, 1 hemisperich, 2 none
var diffuseReflection = 0; // 0 lambert, 1 none
var specularReflecion = 2; // 0 phong, 1 blinn, 2 none
//Direct Light Default Settings
var dirTheta = 68;
var dirPhi = -82;
var directDir = [   Math.sin(utils.degToRad(dirTheta))*Math.sin(utils.degToRad(dirPhi)),
                    Math.cos(utils.degToRad(dirTheta)),
                    Math.sin(utils.degToRad(dirTheta))*Math.cos(utils.degToRad(dirPhi))];
var dirColor = [1.0, 1.0, 1.0, 1.0];
//Point Light Default Settings
var pointPos = [-3.0, 8.5, 1.0];
var pointDecay = 0;
var pointTarget = 1;
var pointColor = [1.0, 1.0, 1.0, 1.0];
//Spot Light Default Settings
var spotPos = [-3.0, 8.5, 1.0];
var spotDecay = 0;
var spotTarget = 1;
var spotTheta = 15;
var spotPhi = 13;
var directSpot = [  Math.sin(utils.degToRad(spotTheta))*Math.sin(utils.degToRad(spotPhi)),
                    Math.cos(utils.degToRad(spotTheta)),
                    Math.sin(utils.degToRad(spotTheta))*Math.cos(utils.degToRad(spotPhi))];
var spotConeIn = 35;
var spotConeOut = 72;
var spotColor = [1.0, 1.0, 1.0, 1.0];
//Ambient Light Ambient
var ambientColor = [0.0, 0.0, 0.0, 1.0];
//Ambient Light Hemisperic
var hemispericLowerColor = [0.0, 0.0, 0.0, 1.0];
var hemispericUpperColor = [0.0, 0.0, 0.0, 1.0];
var hemispericTheta = 90;
var hemispericPhi = 90;
var directHemisperic = [   Math.sin(utils.degToRad(hemispericTheta))*Math.sin(utils.degToRad(hemispericPhi)),
                            Math.cos(utils.degToRad(hemispericTheta)),
                            Math.sin(utils.degToRad(hemispericTheta))*Math.cos(utils.degToRad(hemispericPhi))];


//Lambert Diffuse Reflection 
var lambertTexture = 100;
var lambertColor = [0.5, 1.0, 1.0, 1.0];
//Phong Specular Reflection
var PhongShiny = 5;
var PhongColor = [1.0, 1.0, 1.0, 1.0];
//Blinn Specular Reflection
var BlinnShiny = 5;
var BlinnColor = [1.0, 1.0, 1.0, 1.0];


// Models Vars
//
var models = {}; //Array witch contains all models loaded (scene_graphs.js)

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

// Object for scene (sceneGraph)
var objects;
var objectsPositions;

var basePositionNode;
var baseNode;

var piecePositionNode;
var pieceNode;


// Initial position of first piece
var currentPx = -3;
var currentPy = 6;
var currentPz = 3;

// Game Variables
var gameEnded = false;
var draw = false;
var currentTurn = 1;

//Variables used for Animation
var lastUpdateTime = (new Date).getTime();
var fluctuate = true;
var finalPosition = 6;
var flag = 0;


//Location for fs
var positionAttributeLocation; 
var normalAttributeLocation;  
var matrixLocation;
var uvLocation;
var vertexMatrixPositionHandle;
var normalMatrixPositionHandle;
var textLocation;
var eyePositionHandle;
// Light Locations
var lightTypeLocation;
var lightAmbientLocation;
var diffuseReflectionLocation;
var lightSpecularLocation;
var directColorLocation;
var pointColorLocation;
var spotColorLocation;
var ambientColorLocation;
var ambientLowerColorLocation;
var ambientUpperColorLocation;
var lambertColorLocation;
var phongColorLocation;
var blinnColorLocation;
var directDirLocation;
var pointPosLocation;
var pointDecayLocation;
var pointTargetGLocation;
var spotPosLocation;
var spotDecayLocation;
var spotTargetGLocation;
var spotDirLocation;
var spotConeInLocation;
var spotConeOutLocation;
var hemisphericDirLocation;
var lambertTextureLocation;
var phongShinyLocation;
var blinnShinyLocation;

