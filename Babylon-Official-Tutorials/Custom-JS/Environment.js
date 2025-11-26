/*
(Getting Started - Chapter 5 - Distant Hills)
We want to set the village in a valley. It would be possible to create hills 
from meshes, however there is another way to add vertical height to a ground 
mesh. This is achieved using a height map which uses shades of gray to determine 
the height of the ground. White areas are the highest parts and black the lowest. 
*/

function SimpleHeightMap(){
    const scene = new BABYLON.Scene(engine);
    
    //Create large ground for valley environment
    const largeGround = BABYLON.MeshBuilder.CreateGroundFromHeightMap(
        "largeGround", "../Village/villageheightmap.png", 
        {width:150, height:150, subdivisions: 20, minHeight:0, maxHeight: 10});
    
    /**** Set camera and light *****/
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 200, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(4, 1, 0));

    return scene;
}

function SimpleHeightMapWithTexture(){
    const scene = new BABYLON.Scene(engine);
    
    //Create large ground for valley environment
    const largeGroundMat = new BABYLON.StandardMaterial("largeGroundMat");
    largeGroundMat.diffuseTexture = new BABYLON.Texture(
        "../Village/valleygrass.png");
    
    const largeGround = BABYLON.MeshBuilder.CreateGroundFromHeightMap(
        "largeGround", "../Village/villageheightmap.png", 
        {width:150, height:150, subdivisions: 20, minHeight:0, maxHeight: 10});
    largeGround.material = largeGroundMat;

    /**** Set camera and light *****/
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 200, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(2, 1, 0));

    return scene;
}

function SimpleHeightMapWithTextureClearer(){
    const scene = new BABYLON.Scene(engine);
    
    //Create Village ground
    const groundMat = new BABYLON.StandardMaterial("groundMat");
    groundMat.diffuseTexture = new BABYLON.Texture(
        "../Village/villagegreen.png");
    groundMat.diffuseTexture.hasAlpha = true;

    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:24, height:24});
    ground.material = groundMat;

    //large ground
    const largeGroundMat = new BABYLON.StandardMaterial("largeGroundMat");
    largeGroundMat.diffuseTexture = new BABYLON.Texture(
        "../Village/valleygrass.png");
    
    const largeGround = BABYLON.MeshBuilder.CreateGroundFromHeightMap(
        "largeGround", "../Village/villageheightmap.png", 
        {width:150, height:150, subdivisions: 20, minHeight:0, maxHeight: 10});
    largeGround.material = largeGroundMat;
    largeGround.position.y = -0.01; // if y = 0, the two grounds will fight and cause flickering.

    /**** Set camera and light *****/
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 200, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(2, 1, 0));

    return scene;
}

function ValleyVillage(OriginalGround=false){
    const scene = HouseWithCarAndCharacter(OriginalGround);
    //Create Village ground
    const groundMat = new BABYLON.StandardMaterial("groundMat");
    groundMat.diffuseTexture = new BABYLON.Texture(
        "../Village/villagegreen.png");
    groundMat.diffuseTexture.hasAlpha = true;

    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:24, height:24});
    ground.material = groundMat;

    //large ground
    const largeGroundMat = new BABYLON.StandardMaterial("largeGroundMat");
    largeGroundMat.diffuseTexture = new BABYLON.Texture(
        "../Village/valleygrass.png");
    
    const largeGround = BABYLON.MeshBuilder.CreateGroundFromHeightMap(
        "largeGround", "../Village/villageheightmap.png", 
        {width:150, height:150, subdivisions: 20, minHeight:0, maxHeight: 10});
    largeGround.material = largeGroundMat;
    largeGround.position.y = -0.01; // if y = 0, the two grounds will fight and cause flickering.

    return scene;
}