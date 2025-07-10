function AnimationCharacter () {
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 50, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
    // Dude
    BABYLON.ImportMeshAsync("./Village/Dude.babylon", scene).then((result) => {
        var dude = result.meshes[0];
        dude.scaling = new BABYLON.Vector3(0.25, 0.25, 0.25);
        scene.beginAnimation(result.skeletons[0], 0, 100, true, 1.0);
    });
    return scene;
}

/*
A little trickier and using a bit of trial and error for the turns and 
distance we can achieve a more complicated walk for the character around 
the village. One reason for using degrees and converting them to radians 
for the rotate method is that it is easier to adjust by adding one or 
two degrees.

Since the character, dude, imported from the .babylon file has had its 
rotation set using a rotationQuaternion rather than rotation we use the 
rotate method to reset the characters orientation.
*/

function WalkingCharacter (scene) {
    const walk = function (turn, dist) {
        this.turn = turn;
        this.dist = dist;
    }
    
    const track = [];
    track.push(new walk(86, 7));
    track.push(new walk(-85, 14.8));
    track.push(new walk(-93, 16.5));
    track.push(new walk(48, 25.5));
    track.push(new walk(-112, 30.5));
    track.push(new walk(-72, 33.2));
    track.push(new walk(42, 37.5));
    track.push(new walk(-98, 45.2));
    track.push(new walk(0, 47))

    // Dude
    BABYLON.SceneLoader.ImportMeshAsync("him", "./Village/", "Dude.babylon", scene).then((result) => {
        var dude = result.meshes[0];
        dude.scaling = new BABYLON.Vector3(0.032, 0.032, 0.032);
        dude.position = new BABYLON.Vector3(-6, 0, 0); // Initial position
        dude.rotate(BABYLON.Axis.Y, BABYLON.Tools.ToRadians(-95), BABYLON.Space.LOCAL);
        const startRotation = dude.rotationQuaternion.clone();    

        scene.beginAnimation(result.skeletons[0], 0, 100, true, 1.0);

        let distance = 0;
        let step = 0.015;
        let p = 0;

        scene.onBeforeRenderObservable.add(() => {
		    dude.movePOV(0, 0, step);
            distance += step;
              
            if (distance > track[p].dist) {
                    
                dude.rotate(BABYLON.Axis.Y, BABYLON.Tools.ToRadians(track[p].turn), BABYLON.Space.LOCAL);
                p +=1;
                p %= track.length; 
                if (p === 0) {
                    distance = 0;
                    dude.position = new BABYLON.Vector3(-6, 0, 0);
                    dude.rotationQuaternion = startRotation.clone();
                }
            }
			
        })
    });
    
    return scene;
}