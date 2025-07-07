function Initialization() {
    // Creates a basic Babylon Scene object
    const scene = new BABYLON.Scene(engine);
    // Creates and positions a free camera
    const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    // Targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    // Attaches the camera to the canvas
    camera.attachControl(canvas, true);
    // Creates a light, aiming 0,1,0
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    // Dim the light a small amount 0 - 1
    light.intensity = 0.7;
    // Built-in 'sphere' shape.
    const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2, segments: 32 }, scene);
    // Move sphere upward 1/2 its height
    sphere.position.y = 1;
    // Built-in 'ground' shape.
    const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
    return scene;
}

/*
Remove:

const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2, segments: 32 }, scene);
sphere.position.y = 1;

And we will get a blank ground.
*/

function GroundTexture () {
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
    const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
    const groundMaterial = new BABYLON.StandardMaterial("Ground Material", scene);
    groundMaterial.diffuseColor = BABYLON.Color3.Red(); // Color, Capital at first character
    ground.material = groundMaterial;
    let groundTexture = new BABYLON.Texture(Assets.textures.checkerboard_basecolor_png.path, scene);
    groundMaterial.diffuseTexture = groundTexture; // Checkerboard like texture
    return scene;
}

function ImportMesh () {
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
    const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
    const groundMaterial = new BABYLON.StandardMaterial("Ground Material", scene);
    groundMaterial.diffuseColor = BABYLON.Color3.White(); // Color
    ground.material = groundMaterial;
    BABYLON.ImportMeshAsync(Assets.meshes.Yeti.rootUrl 
        + Assets.meshes.Yeti.filename, scene, { meshNames: "" }).then(function (result) {
            result.meshes[0].scaling = new BABYLON.Vector3(0.1, 0.1, 0.1); // size
    });
    return scene;
}

function ArcRotateCamera() {
    const scene = new BABYLON.Scene(engine);
    // const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    // camera.setTarget(BABYLON.Vector3.Zero());
    var camera = new BABYLON.ArcRotateCamera("camera", BABYLON.Tools.ToRadians(90), BABYLON.Tools.ToRadians(65), 10, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
    const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
    const groundMaterial = new BABYLON.StandardMaterial("Ground Material", scene);
    groundMaterial.diffuseColor = BABYLON.Color3.White(); // Color
    ground.material = groundMaterial;
    BABYLON.ImportMeshAsync(Assets.meshes.Yeti.rootUrl 
        + Assets.meshes.Yeti.filename, scene, { meshNames: "" }).then(function (result) {
            result.meshes[0].scaling = new BABYLON.Vector3(0.1, 0.1, 0.1); // size
    });
    return scene;
}

/* 
Like most meshes created with MeshBuilder the box is created positioned 
with its center at the origin and needs three parameters. These are a name, 
a string, options, a JavaScript object, and a scene. By leaving the options 
as an empty object with no properties the box defaults to one of unit size 
for its width, height and depth.

Since at this point there is only one scene you may notice that this 
parameter can be dropped from the camera, light and box as the default 
is for them to be placed in the current scene.
*/
function Cube() {
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    const box = BABYLON.MeshBuilder.CreateBox("box", {width: 1, height: 1, depth: 1}); // Size
    /*
    or:
    const box = BABYLON.MeshBuilder.CreateBox("box", {}); //unit cube
    box.scaling.x = 2;
    box.scaling.y = 1.5;
    box.scaling.z = 3;

    or:
    const box = BABYLON.MeshBuilder.CreateBox("box", {}); //unit cube
    box.scaling = new BABYLON.Vector3(2, 1.5, 3);
    */
    box.position = new BABYLON.Vector3(-2, 4, 3); // Position
    // box.rotation.y = Math.PI / 4; // Rotation
    // box.rotation.y = BABYLON.Tools.ToRadians(45);
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:10, height:10});
    return scene;
}

/*
Export to babylon file (Note, .babylon is a json format file)

.babylon A model is stored as one mesh, i.e. each house body and roof forms one house.

.glb A _root_ node is added to hold all the models and model parts, which are stored as sub-meshes.
*/

// Babylon viewer (TODO)

// The audio engine is asynchronous, so it needs to be used in an `async` function.
// You can create an async function like the one below and call it right away,
// or you can add `async` to the playground's `createScene` function, for example: `var createScene = async function () { ... }
async function initAudio() {
    const audioEngine = await BABYLON.CreateAudioEngineAsync();
    await audioEngine.unlockAsync(); // Note that await audioEngine.unlock(); is incorrect.

    // Audio engine is ready to play sounds ...

    // Track: "No" by Soulsonic
    // License: CC BY-ND 3.0
    BABYLON.CreateStreamingSoundAsync("backgroundMusic", "https://amf-ms.github.io/AudioAssets/cc-music/electronic/Soulsonic--No.mp3", { autoplay: true, loop: true }, audioEngine);
}

function CreatingSound () {
    const scene = new BABYLON.Scene(engine);

    /**** Set camera and light *****/
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
    initAudio();
    const box = BABYLON.MeshBuilder.CreateBox("box", {});
    box.position.y = 0.5;
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:10, height:10});

    return scene;
}

/*
Adding a roof would make our box more house like. We need a prism like 
shape. Luckily we can do that using CreateCylinder. Well the name might 
imply a cylinder rather than a prism however in using it you need to 
state how may points around the circumference of the cylinder and for 
a prism we can use three points.
*/
function HouseRoof () {
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
    const box = BABYLON.MeshBuilder.CreateBox("box", {}); // Create a box in center.
    box.position.y = 0.5;
    // Add a roof (Cylinder)
    const roof = BABYLON.MeshBuilder.CreateCylinder("roof", {diameter: 1.3, height: 1.2, tessellation: 3});
    roof.scaling.x = 0.75;
    roof.rotation.z = Math.PI / 2;
    roof.position.y = 1.22;
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:10, height:10});
    return scene;
}

function HouseTextureSimple () {
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

    /**** Materials *****/
    //color
    const groundMat = new BABYLON.StandardMaterial("groundMat");
    groundMat.diffuseColor = new BABYLON.Color3(0.18, 0.47, 0.05);
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:10, height:10});
    ground.material = groundMat;

    //texture object
    const roofMat = new BABYLON.StandardMaterial("roofMat");
    roofMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/roof.jpg");
    const boxMat = new BABYLON.StandardMaterial("boxMat");
    boxMat.diffuseTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/floor.png")

    /**** World Objects *****/
    const box = BABYLON.MeshBuilder.CreateBox("box", {});
    box.material = boxMat;
    box.position.y = 0.5;
    const roof = BABYLON.MeshBuilder.CreateCylinder("roof", {diameter: 1.3, height: 1.2, tessellation: 3});
    roof.material = roofMat;
    roof.scaling.x = 0.75;
    roof.rotation.z = Math.PI / 2;
    roof.position.y = 1.22;
    return scene;
}


/*
In the options properties for a box one is faceUV an array of Vector4s. 
We can use this to obtain a part of the area of an image to apply to 
one face of the box.

In the faceUV array faces are numbered 0 for back, 1 front, 2 right, 
3 left, 4 top and 5 bottom.

The width of each image is 0.25 of the whole image width. 
To specify the part of the image to use we give two co-ordinates 
one for the lower left corner and one for the upper right corner. 
For the whole image we would use (0, 0) and (1, 1), for part images 
the co-ordinate values will be a fraction between 0 and 1.

Rather than using two sets of co-ordinates we use a 4 dimensional
vector (lower left x, lower left y, upper right x, upper right y)

Matching sides to part images gives
front, 1, (0.0, 0.0, 0.25, 1.0)
right, 2, (0.25, 0, 0.5, 1.0)
back, 0, (0.5, 0.0, 0.75, 1.0)
left, 3, (0.75, 0, 1.0, 1.0)
as the top and bottom are not seen we will just use the defaults.

We set these using
*/
function HouseTextureFaceUV () {
    const scene = new BABYLON.Scene(engine);

    /**** Set camera and light *****/
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

    /**** Materials *****/
    //color
    const groundMat = new BABYLON.StandardMaterial("groundMat");
    groundMat.diffuseColor = new BABYLON.Color3(0, 1, 0)

    //texture
    const roofMat = new BABYLON.StandardMaterial("roofMat");
    roofMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/roof.jpg");
    const boxMat = new BABYLON.StandardMaterial("boxMat");
    boxMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/cubehouse.png")


    //options parameter to set different images on each side
    const faceUV = [];
    faceUV[0] = new BABYLON.Vector4(0.5, 0.0, 0.75, 1.0); //rear face
    faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.25, 1.0); //front face
    faceUV[2] = new BABYLON.Vector4(0.25, 0, 0.5, 1.0); //right side
    faceUV[3] = new BABYLON.Vector4(0.75, 0, 1.0, 1.0); //left side
    // top 4 and bottom 5 not seen so not set
    

    /**** World Objects *****/
    const box = BABYLON.MeshBuilder.CreateBox("box", {faceUV: faceUV, wrap: true});
    box.material = boxMat;
    box.position.y = 0.5;
    const roof = BABYLON.MeshBuilder.CreateCylinder("roof", {diameter: 1.3, height: 1.2, tessellation: 3});
    roof.material = roofMat;
    roof.scaling.x = 0.75;
    roof.rotation.z = Math.PI / 2;
    roof.position.y = 1.22;
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:10, height:10});
    ground.material = groundMat;

    return scene;
}

/*
In the options properties for a box one is faceUV an array of 
Vector4s. We can use this to obtain a part of the area of an 
image to apply to one face of the box.

In the faceUV array faces are numbered 0 for back, 1 front, 
2 right, 3 left, 4 top and 5 bottom.
*/

/*
1. When you add a model to a scene, you are loading it through the browser. 
As you likely already know, loading anything from a website is an 
asynchronous function. Therefore, before you can do anything with your 
models, you first must ensure they have been loaded successfully. You 
can do this using the ImportMeshAsync method of the SceneLoader, which 
can be done as follows:

BABYLON.ImportMeshAsync(folder_path + file_name, scene, optionalOptions);

2. The scene parameter is optional and will default to the current scene. 
In the options you can specify which meshes to load:

BABYLON.ImportMeshAsync("/relative path/myFile"); //Empty string loads all meshes
BABYLON.ImportMeshAsync("/relative path/myFile", scene, { meshNames: "model1" }); //Name of the model loads one model
BABYLON.ImportMeshAsync("/relative path/myFile", scene, { meshNames: ["model1", "model2"] }); //Array of model names

3. Note that any of the calls above will only load the models; however, 
you will not be able to manipulate them in any way. Internally, a 
Promise object is setup and returned, but the above code does nothing 
with the result of that Promise. Examples of this are in the following 
two playgrounds, which only import the named models.

4. Therefore, in order to act on the result and manipulate the objects, 
we follow the Promise with the then method to call a function with 
the result of the Promise. The result is an object containing, among 
other things, the property meshes which contains all the loaded models. 
We can use this array, or their names, to manipulate each mesh.
*/
function Village () {
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0)); 
    // BABYLON.ImportMeshAsync("https://assets.babylonjs.com/meshes/both_houses_scene.babylon", scene, {
    //     meshNames: ["ground", "detached_house", "semi_house"]
    // }); // Empty string loads all meshes (detached house is a smaller house; semi_house is a larger house)
    BABYLON.ImportMeshAsync("https://assets.babylonjs.com/meshes/both_houses_scene.babylon").then((result) => {
        const detached_house = scene.getMeshByName("detached_house");
        detached_house.position.y = 0;
        detached_house.position.x = 1;
        console.log(result.meshes);
        const semi_house = result.meshes[2]; // Order: ["ground", "detached_house", "semi_house"]
        semi_house.position.y = 0;
        semi_house.position.x = -1;
    }); // manipulate the objects
    return scene;
}

function createScenefun() {
    return HouseTexture();
};