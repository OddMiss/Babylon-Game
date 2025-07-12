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

contains, in order, images of the same size for the front, right, back 
and left sides of the house.

The width of each image is 0.25 of the whole image width. 
To specify the part of the image to use we give two co-ordinates 
one for the ⭐lower left corner and one for the upper right corner. 
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

Unless we set another option property, wrap = true, some of these partial 
images will still be rotated. We create the box like this: (Explain see in Notes file)

const box = BABYLON.MeshBuilder.CreateBox("box", {faceUV: faceUV, wrap: true});

Of course we also need to change the image used for the diffuse texture of the box material.
*/
function HouseTextureFaceUV () {
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
    //color
    const groundMat = new BABYLON.StandardMaterial("groundMat");
    groundMat.diffuseColor = new BABYLON.Color3(0.18, 0.47, 0.05);

    //texture
    const roofMat = new BABYLON.StandardMaterial("roofMat");
    roofMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/roof.jpg");
    const boxMat = new BABYLON.StandardMaterial("boxMat");
    boxMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/cubehouse.png")
    const SemiboxMat = new BABYLON.StandardMaterial("SemiboxMat");
    SemiboxMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/semihouse.png")

    //options parameter to set different images on each side for detacted house
    const Detached_House_faceUV = [];
    Detached_House_faceUV[0] = new BABYLON.Vector4(0.5, 0.0, 0.75, 1.0); //rear face
    Detached_House_faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.25, 1.0); //front face
    Detached_House_faceUV[2] = new BABYLON.Vector4(0.25, 0, 0.5, 1.0); //right side
    Detached_House_faceUV[3] = new BABYLON.Vector4(0.75, 0, 1.0, 1.0); //left side
    // top 4 and bottom 5 not seen so not set
    
    // The front and back of the house (far left and right of the image) is 
    // twice the width of a side (middle image) which we can use twice.
    const Semi_House_faceUV = [];
    Semi_House_faceUV[0] = new BABYLON.Vector4(0.6, 0.0, 1.0, 1.0); //rear face
    Semi_House_faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.4, 1.0); //front face
    Semi_House_faceUV[2] = new BABYLON.Vector4(0.4, 0, 0.6, 1.0); //right side
    Semi_House_faceUV[3] = new BABYLON.Vector4(0.4, 0, 0.6, 1.0); //left side

    /**** World Objects *****/
    const box = BABYLON.MeshBuilder.CreateBox("box", {faceUV: Detached_House_faceUV, wrap: true});
    box.material = boxMat;
    box.position.y = 0.5;
    const Semibox = BABYLON.MeshBuilder.CreateBox("box", {width: 2, faceUV: Semi_House_faceUV, wrap: true});
    Semibox.material = SemiboxMat;
    Semibox.position.y = 0.5;
    Semibox.position.x = 2;
    const Semiroof = BABYLON.MeshBuilder.CreateCylinder("roof", {diameter: 1.3, height: 1.2, tessellation: 3});
    const roof = BABYLON.MeshBuilder.CreateCylinder("roof", {diameter: 1.3, height: 1.2, tessellation: 3});
    roof.material = Semiroof.material = roofMat;
    roof.scaling.x = Semiroof.scaling.x = 0.75;
    Semiroof.scaling.y = 2;
    roof.rotation.z = Semiroof.rotation.z = Math.PI / 2;
    roof.position.y = Semiroof.position.y = 1.22;
    Semiroof.position.x = 2;
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:10, height:10});
    ground.material = groundMat;

    return scene;
}

/******Build Functions***********/
function buildGround (width, height, color) {
    //color
    const groundMat = new BABYLON.StandardMaterial("groundMat");
    groundMat.diffuseColor = color;

    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: width, height: height});
    ground.material = groundMat;
    return ground;
}

function buildBox (Boxmat_Type, Image_Type, 
    rear_vector, front_vector, right_vector, left_vector, 
    position_x, position_y, position_z, width, height) {
    const boxMat = new BABYLON.StandardMaterial(Boxmat_Type);
    boxMat.diffuseTexture = new BABYLON.Texture(`https://assets.babylonjs.com/environments/${Image_Type}.png`) // 'cubehouse', 'semihouse'
    //options parameter to set different images on each side for detacted house
    const faceUV = [];
    faceUV[0] = rear_vector; //rear face
    faceUV[1] = front_vector; //front face
    faceUV[2] = right_vector; //right side
    faceUV[3] = left_vector; //left side

    const box = BABYLON.MeshBuilder.CreateBox("box", {width: width, height: height, faceUV: faceUV, wrap: true});
    box.material = boxMat;
    box.position.x = position_x;
    box.position.y = position_y;
    box.position.z = position_z;
}

function buildRoof (diameter, height, tessellation, 
    scaling_x, scaling_y, scaling_z, 
    rotation_x, rotation_y, rotation_z, 
    position_x, position_y, position_z) {
    const roofMat = new BABYLON.StandardMaterial("roofMat");
    roofMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/roof.jpg");

    const roof = BABYLON.MeshBuilder.CreateCylinder("roof", {diameter: diameter, height: height, tessellation: tessellation});
    roof.material = roofMat;
    roof.scaling.x = scaling_x;
    roof.scaling.y = scaling_y;
    roof.scaling.z = scaling_z;
    roof.rotation.x = rotation_x;
    roof.rotation.y = rotation_y;
    roof.rotation.z = rotation_z;
    roof.position.x = position_x;
    roof.position.y = position_y;
    roof.position.z = position_z;
}

function HouseUsingFunctions() {
    const scene = new BABYLON.Scene(engine);

    /**** Set camera and light *****/
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
    const ground = buildGround(10, 10, new BABYLON.Color3(0.18, 0.47, 0.05));
    const Semibox = buildBox("SemiboxMat", "semihouse", 
        new BABYLON.Vector4(0.6, 0.0, 1.0, 1.0), 
        new BABYLON.Vector4(0.0, 0.0, 0.4, 1.0), 
        new BABYLON.Vector4(0.4, 0, 0.6, 1.0), 
        new BABYLON.Vector4(0.4, 0, 0.6, 1.0),
        2, 0.5, 0, 2, 1);
    const Detachedbox = buildBox("boxMat", "cubehouse", 
        new BABYLON.Vector4(0.5, 0.0, 0.75, 1.0), 
        new BABYLON.Vector4(0.0, 0.0, 0.25, 1.0), 
        new BABYLON.Vector4(0.25, 0, 0.5, 1.0), 
        new BABYLON.Vector4(0.75, 0, 1.0, 1.0),
        0, 0.5, 0, 1, 1);
    const Detachedbox2 = buildBox("boxMat", "cubehouse", 
        new BABYLON.Vector4(0.5, 0.0, 0.75, 1.0), 
        new BABYLON.Vector4(0.0, 0.0, 0.25, 1.0), 
        new BABYLON.Vector4(0.25, 0, 0.5, 1.0), 
        new BABYLON.Vector4(0.75, 0, 1.0, 1.0), 
        -1.5, 0.5, 0, 1, 1);
    const Detachedroof = buildRoof(1.3, 1.2, 3, 0.75, 1, 1, 0, 0, Math.PI / 2, 0, 1.22, 0);
    const Detachedroof2 = buildRoof(1.3, 1.2, 3, 0.75, 1, 1, 0, 0, Math.PI / 2, -1.5, 1.22, 0);
    const   Semiroof =   buildRoof(1.3, 1.2, 3, 0.75, 2, 1, 0, 0, Math.PI / 2, 2, 1.22, 0);
    const house = BABYLON.Mesh.MergeMeshes([Detachedbox2, Detachedroof2]); // TODD (https://doc.babylonjs.com/features/featuresDeepDive/mesh/mergeMeshes/)
    return scene;
}

/*
The two main ways to copy a mesh is to clone it or create an instance of it. 
Cloning gives you an independent copy of a mesh whereas an instance is still 
linked to the original for its material. You cannot change the material of an 
instance of a mesh. There are also advanced ways of creating copies which are 
available in the meshes feature deep dive.

As at this point in our world all the houses will use the same material we 
will go with createInstance.

Before we do that we combine the building functions to produce a house of 
width 1 or 2, a detached or semi-detached house respectively.
*/
const buildHouseOfficial = (width) => {
    const box = buildBoxOfficial(width);
    const roof = buildRoofOfficial(width);

    return BABYLON.Mesh.MergeMeshes([box, roof], true, false, null, false, true);
}
const buildBoxOfficial = (width) => {
    //texture
    const boxMat = new BABYLON.StandardMaterial("boxMat");
    if (width == 2) {
       boxMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/semihouse.png") 
    }
    else {
        boxMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/cubehouse.png");   
    }

    //options parameter to set different images on each side
    const faceUV = [];
    if (width == 2) {
        faceUV[0] = new BABYLON.Vector4(0.6, 0.0, 1.0, 1.0); //rear face
        faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.4, 1.0); //front face
        faceUV[2] = new BABYLON.Vector4(0.4, 0, 0.6, 1.0); //right side
        faceUV[3] = new BABYLON.Vector4(0.4, 0, 0.6, 1.0); //left side
    }
    else {
        faceUV[0] = new BABYLON.Vector4(0.5, 0.0, 0.75, 1.0); //rear face
        faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.25, 1.0); //front face
        faceUV[2] = new BABYLON.Vector4(0.25, 0, 0.5, 1.0); //right side
        faceUV[3] = new BABYLON.Vector4(0.75, 0, 1.0, 1.0); //left side
    }
    // top 4 and bottom 5 not seen so not set

    /**** World Objects *****/
    const box = BABYLON.MeshBuilder.CreateBox("box", {width: width, faceUV: faceUV, wrap: true});
    box.material = boxMat;
    box.position.y = 0.5;

    return box;
}

const buildRoofOfficial = (width) => {
    //texture
    const roofMat = new BABYLON.StandardMaterial("roofMat");
    roofMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/roof.jpg");

    const roof = BABYLON.MeshBuilder.CreateCylinder("roof", {diameter: 1.3, height: 1.2, tessellation: 3});
    roof.material = roofMat;
    roof.scaling.x = 0.75;
    roof.scaling.y = width;
    roof.rotation.z = Math.PI / 2;
    roof.position.y = 1.22;

    return roof;
}

/******Build Functions***********/
const buildDwellings = () => {
    const ground = buildGround(20, 20, new BABYLON.Color3(0.18, 0.47, 0.05));

    const detached_house = buildHouseOfficial(1);
    detached_house.rotation.y = -Math.PI / 16;
    detached_house.position.x = -6.8;
    detached_house.position.z = 2.5;

    const semi_house = buildHouseOfficial(2);
    semi_house .rotation.y = -Math.PI / 16;
    semi_house.position.x = -4.5;
    semi_house.position.z = 3;

    const places = []; //each entry is an array [house type, rotation, x, z]
    places.push([1, -Math.PI / 16, -6.8, 2.5 ]);
    places.push([2, -Math.PI / 16, -4.5, 3 ]);
    places.push([2, -Math.PI / 16, -1.5, 4 ]);
    places.push([2, -Math.PI / 3, 1.5, 6 ]);
    places.push([2, 15 * Math.PI / 16, -6.4, -1.5 ]);
    places.push([1, 15 * Math.PI / 16, -4.1, -1 ]);
    places.push([2, 15 * Math.PI / 16, -2.1, -0.5 ]);
    places.push([1, 5 * Math.PI / 4, 0, -1 ]);
    places.push([1, Math.PI + Math.PI / 2.5, 0.5, -3 ]);
    places.push([2, Math.PI + Math.PI / 2.1, 0.75, -5 ]);
    places.push([1, Math.PI + Math.PI / 2.25, 0.75, -7 ]);
    places.push([2, Math.PI / 1.9, 4.75, -1 ]);
    places.push([1, Math.PI / 1.95, 4.5, -3 ]);
    places.push([2, Math.PI / 1.9, 4.75, -5 ]);
    places.push([1, Math.PI / 1.9, 4.75, -7 ]);
    places.push([2, -Math.PI / 3, 5.25, 2 ]);
    places.push([1, -Math.PI / 3, 6, 4 ]);

    //Create instances from the first two that were built 
    const houses = [];
    for (let i = 0; i < places.length; i++) {
        if (places[i][0] === 1) {
            houses[i] = detached_house.createInstance("house" + i);
        }
        else {
            houses[i] = semi_house.createInstance("house" + i);
        }
        houses[i].rotation.y = places[i][1];
        houses[i].position.x = places[i][2];
        houses[i].position.z = places[i][3];
    }
}

function HouseCopies(){
    const scene = new BABYLON.Scene(engine);

    /**** Set camera and light *****/
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
    buildDwellings();
    return scene;
}

function HouseImportGLB() {
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0)); 
    BABYLON.SceneLoader.ImportMeshAsync("", "https://assets.babylonjs.com/meshes/", "village.glb");
    return scene;
}

// Web Viewer (from glb file)
/*
<html>
  <head>
    <title>Babylon Viewer Demo</title>
    <meta charset="UTF-8" />
    <script
      type="module"
      src="https://cdn.jsdelivr.net/npm/@babylonjs/viewer@7.42.0-alpha/dist/babylon-viewer.esm.min.js"
    ></script>
    <style>
      html, body { width: 100%; height: 100%; padding: 0; margin: 0; overflow: hidden; }
    </style>
  </head>
  <body>
    <babylon-viewer
      source="https://raw.githubusercontent.com/BabylonJS/Assets/master/meshes/village.glb"
    >
    </babylon-viewer>
  </body>
</html>
*/

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

function HousesWithCar () {
    const scene = HouseCopies();
    const car = buildCar();
    const carwheels = buildWheels(car);
    car.rotation = new BABYLON.Vector3(-Math.PI / 2, 0, Math.PI / 2);
    car.position.y = 0.16;
    car.position.x = 3;
    car.position.z = 8;

    // Car animation
    const animCar = new BABYLON.Animation("carAnimation", "position.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    const carKeys = []; 

    carKeys.push({
        frame: 0,
        value: 8
    });

    carKeys.push({
        frame: 150,
        value: -7
    });

    carKeys.push({
        frame: 200,
        value: -7
    });

    animCar.setKeys(carKeys);

    car.animations = [];
    car.animations.push(animCar);

    scene.beginAnimation(car, 0, 200, true);
    
    //wheel animation
    const wheelRB = scene.getMeshByName("wheelRB");
    const wheelRF = scene.getMeshByName("wheelRF");
    const wheelLB = scene.getMeshByName("wheelLB");
    const wheelLF = scene.getMeshByName("wheelLF");
    
    scene.beginAnimation(wheelRB, 0, 30, true);
    scene.beginAnimation(wheelRF, 0, 30, true);
    scene.beginAnimation(wheelLB, 0, 30, true);
    scene.beginAnimation(wheelLF, 0, 30, true);
    return scene;
}

function HouseWithCharacter () {
    const scene = WalkingCharacter(HouseCopies());
    return scene;
}

function HouseWithCarAndCharacter () {
    const scene = WalkingCharacter(HousesWithCar());
    return scene;
}

function HouseAvoidCrash () {
    const scene = HousesWithCar();
    const hitBox = BABYLON.MeshBuilder.CreateBox("carbox", {width: 0.5, height: 0.6, depth: 4.5});
    const wireMat = new BABYLON.StandardMaterial("wireMat");
    wireMat.wireframe = true;
    hitBox.material = wireMat;
    hitBox.position.x = 3.1;
    hitBox.position.y = 0.3;
    hitBox.position.z = -5;

    // Dude
    BABYLON.SceneLoader.ImportMeshAsync("him", "/scenes/Dude/", "Dude.babylon", scene).then((result) => {
        var dude = result.meshes[0];
        dude.scaling = new BABYLON.Vector3(0.008, 0.008, 0.008);
        
            
        dude.position = new BABYLON.Vector3(1.5, 0, -6.9);
        dude.rotate(BABYLON.Axis.Y, BABYLON.Tools.ToRadians(-90), BABYLON.Space.LOCAL);
        const startRotation = dude.rotationQuaternion.clone();    
            
        scene.beginAnimation(result.skeletons[0], 0, 100, true, 1.0);

        let distance = 0;
        let step = 0.015;
        let p = 0;

        scene.onBeforeRenderObservable.add(() => {
            if (carReady) {
                if (!dude.getChildren()[1].intersectsMesh(hitBox) && scene.getMeshByName("car").intersectsMesh(hitBox)) {
                    return;
                }
                
            }
		    dude.movePOV(0, 0, step);
            distance += step;
              
            if (distance > track[p].dist) {
                    
                dude.rotate(BABYLON.Axis.Y, BABYLON.Tools.ToRadians(track[p].turn), BABYLON.Space.LOCAL);
                p +=1;
                p %= track.length; 
                if (p === 0) {
                    distance = 0;
                    dude.position = new BABYLON.Vector3(1.5, 0, -6.9);
                    dude.rotationQuaternion = startRotation.clone();
                }
            }
			
        })
    });
    return scene;
}