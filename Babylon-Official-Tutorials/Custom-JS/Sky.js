/*
(Getting Started - Chapter 5 - Skies Above)
We can simulate the appearance of a sky by applying six suitable images to the 
insides of a large skybox cube. (Images are a lot easier and faster to render than 
3D objects, and just as good for far-distant scenery.)

Skybox images are usually loaded with `CubeTexture`. `CubeTexture`'s constructor 
takes a base URL and (by default) appends "_px.jpg", "_nx.jpg", "_py.jpg", 
"_ny.jpg", "_pz.jpg", and "_nz.jpg" to load the +x, -x, +y, -y, +z, and -z 
facing sides of the cube.

Cube textures must be applied using `reflectionTexture` even though the skybox 
is not a reflection map. Setting `coordinatesMode` to SKYBOX_MODE paints the 
texture directly on the cube rather than simulating reflections.

skybox: https://doc.babylonjs.com/features/featuresDeepDive/environment/skybox
*/

function ValleyVillageWithSky(){
    const scene = ValleyVillage();
    //Skybox
    const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:150}, scene);
    const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    // "../Village/skybox/" is the skybox pictures of folder
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("../Village/skybox/skybox", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;

    return scene;
}