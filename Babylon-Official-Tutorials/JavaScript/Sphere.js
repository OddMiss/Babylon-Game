/*
This time instead of creating another animation object for the character 
we will change its position and orientation before each frame is rendered.

There is a useful property of a mesh, movePOV which allows us to move a 
mesh relative to its point of view. Generally a newly created mesh will 
be considered as facing the negative z direction and this is the direction 
of its point of view. To move a mesh forward 6 units in the direction of 
its point of view you use

mesh.movePOV(0, 0, -6)

The parameters are, in order, distance to move to the right, up and 
forward, generally these are the negative x axis, the positive y axis 
and the negative z axis in the mesh's local space.

In Babylon.js you can write code that will be executed before the 
rendering of the next frame using

scene.onBeforeRenderObservable.add(() => {
    //code to execute
});

In this way properties of objects can be changed render frame by render frame.

Let us take the simple case of a sphere moving around the edges of a triangle. 
We want the sphere to appear to slide along one side, turn to slide along the 
next and then turn and slide along the last side and then repeat.

This is also an opportunity to introduce two types of mesh you can create, a 
sphere and a series of lines. Take a sphere sliding around an isosceles right 
angled triangle as an example.
*/

function AnimationSphere () {
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 1.5, Math.PI / 5, 15, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
    
    //create a sphere
    const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 0.5});
    sphere.position = new BABYLON.Vector3(2, 0, 2);

    //draw lines to form a triangle
    const points = [];
    points.push(new BABYLON.Vector3(2, 0, 2)); // A
    points.push(new BABYLON.Vector3(2, 0, -2)); // B
    points.push(new BABYLON.Vector3(-2, 0, -2)); // C
    points.push(points[0]); //close the triangle;
    BABYLON.MeshBuilder.CreateLines("triangle", {points: points})


    /*
    To produce the animation before each render frame the sphere will move 
    a distance of 0.05. When the distance it has travelled is greater than 
    4 the sphere will make a turn, greater than 8 it will turn again and 
    when greater than the perimeter it will reset and start again.

    We set up a track array of objects with the properties turn and distance. 
    After travelling the given total distance the sphere will rotate by the 
    given turn value.
    */
    const slide = function (turn, dist) { //after covering dist apply turn
        this.turn = turn;
        this.dist = dist;
    }
    
    const track = [];
    // ⭐positive is right, negative is left (from perspective of the sphere)
    track.push(new slide(Math.PI / 2, 4)); // turn 90 degrees after 4 units
    track.push(new slide(Math.PI / 2 + Math.PI / 4, 8)); // turn 90 + 45 degrees after 8 units
    track.push(new slide(3 * Math.PI / 4, 8 + 4 * Math.sqrt(2))); // turn 135 degrees after 8 + 4√2 units

    let distance = 0; // total distance
    let step = 0.05; // distance to move each frame
    let p = 0;

    scene.onBeforeRenderObservable.add(() => {
        /*
        (method) BABYLON.AbstractMesh.movePOV(
            amountRight: number, 
            amountUp: number, 
            amountForward: number): BABYLON.AbstractMesh
        */
        // move along forward
		sphere.movePOV(0, 0, step);
        distance += step;
        /*
        Whenever the required distance is reached a turn is made and the array 
        index pointer, p, is increased by 1. The modulo operator % is used to 
        reset the pointer to zero at the end of the array.
        */
        if (distance > track[p].dist) {       
            /*
            You can see another method, rotate, of rotating. This method 
            rotates the mesh about the given axis by the given angle in 
            radians. It adds to the current rotation. 
            */
            sphere.rotate(BABYLON.Axis.Y, track[p].turn, BABYLON.Space.LOCAL);
            p += 1;
            p %= track.length;
            // To prevent floating point errors accumulating, whenever the index 
            // pointer is reset to 0 the position and rotation of the sphere is also reset
            if (p === 0) {
                distance = 0;
                sphere.position = new BABYLON.Vector3(2, 0, 2); // reset to initial conditions
                sphere.rotation = BABYLON.Vector3.Zero(); // prevents error accumulation
            }
        }
    });
    return scene;
}

function AnimationCircleSphere () {
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 1.5, Math.PI / 5, 15, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
    const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 0.5});
    sphere.position = new BABYLON.Vector3(2, 0, 2);

    // create a circular path for the sphere to follow
    const path = [];
    const radius = 2;
    const numPoints = 100;
    for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        path.push(new BABYLON.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    
    // create a path animation for the sphere
    const animation = new BABYLON.Animation("animation", "position", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const keys = [];
    for (let i = 0; i < path.length; i++) {
        keys.push({ frame: i, value: path[i] });
    }
    animation.setKeys(keys);
    sphere.animations.push(animation);
    scene.beginAnimation(sphere, 0, numPoints - 1, true);

    return scene;
}