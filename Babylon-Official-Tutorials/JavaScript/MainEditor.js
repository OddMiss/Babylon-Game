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
function createScenefun() {
    return HouseWithCarAndCharacter();
};