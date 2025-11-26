/*
The simplest way of seeing if two meshes are in contact is to use the 
intersectsMesh method, as in

mesh1.intersectsMesh(mesh2);

which will be true if a box bounding mesh1 would overlap with a box 
bounding mesh2. Each mesh has a built-in bounding box which lies 
close to the surface of the mesh that is used in checking the 
intersection of the meshes.

Since the character's walk and the car's journey are not phased together 
there will be a time when they are in the same place. However it is not 
possible to predict when the character, taking its long walk around the 
village, and the car, on its short journey, might intersect. In order to 
demonstrate the intersectsMesh method we will make the character walk 
backwards and forwards across the stopping place of the car.

In our case we want the character to stop moving if the car is in a 
"hit" zone and the character is not. It would, after all, be dangerous 
for the character to stop if they are both in the danger zone. In our 
case because of the way the Dude is constructed we need to use one of 
its children to check intersection. Basically Dude is just a holder 
node for the head, torso, legs and arms and the box bounding it is too 
small to be effective in this case.
*/

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