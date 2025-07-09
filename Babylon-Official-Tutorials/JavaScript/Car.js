/*
The car is going to be a very simple one. The body will be built using 
the extrudePolygon method. This is another shape that can be built 
using MeshBuilder. The outline of the shape is drawn in the XZ plane, 
with points in counter-clockwise order and the extrusion is in the Y 
direction. The origin for the polygon is the zero point on the bottom plane.

The outline for the car consists of an array of vector3 points forming 
a horizontal base line, a quarter circle for the front, followed by a 
horizontal base line. The vertical back will be formed by the 
extrudePolygon method as it automatically joins the first and last point.

Note: The extrudePolygon and PolygonMeshBuilder both use a earcut slicing algorithm.
The playground has earcut defined but if you are following this tutorial on your 
own file system that you will need to download the earcut algorithm via CDN or NPM.
(Use <script src="https://cdn.babylonjs.com/earcut.min.js"></script> in html)

If you are using TypeScript then you can inject the earcut algorithm as the 
earcutInjection parameter on the extrudePolygon function.
*/

const buildCar = () => {
    //base
    const outline = [
        new BABYLON.Vector3(-0.3, 0, -0.1),
        new BABYLON.Vector3(0.2, 0, -0.1),
    ]
    //curved front
    for (let i = 0; i < 20; i++) {
        outline.push(new BABYLON.Vector3(0.2 * Math.cos(i * Math.PI / 40), 0, 0.2 * Math.sin(i * Math.PI / 40) - 0.1));
    }
    //top
    outline.push(new BABYLON.Vector3(0, 0, 0.1));
    outline.push(new BABYLON.Vector3(-0.3, 0, 0.1));

    //face UVs
    const faceUV = [];
    // faceUV[0] = new BABYLON.Vector4(0, 0.5, 0.38, 1);
    // faceUV[1] = new BABYLON.Vector4(0, 0, 1, 0.5);
    // faceUV[2] = new BABYLON.Vector4(0.38, 1, 0, 0.5);
    faceUV[0] = new BABYLON.Vector4(0, 0.5, 0.38, 1);
    faceUV[1] = new BABYLON.Vector4(0, 0, 1, 0.5);
    faceUV[2] = new BABYLON.Vector4(0.38, 1, 0, 0.5);
    // faceUV[3] = new BABYLON.Vector4(0, 0, 0, 0);
    // faceUV[4] = new BABYLON.Vector4(0, 0, 0, 0);
    // faceUV[5] = new BABYLON.Vector4(0, 0, 0, 0);

    //material
    const carMat = new BABYLON.StandardMaterial("carMat");
    carMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/car.png");

    //back formed automatically
    const car = BABYLON.MeshBuilder.ExtrudePolygon("car", {shape: outline, depth: 0.2, faceUV: faceUV, wrap: true});
    car.material = carMat;
    return car;
}

function buildWheels (car) {
    //wheel face UVs
    const wheelUV = [];
    wheelUV[0] = new BABYLON.Vector4(0, 0, 1, 1);
    wheelUV[1] = new BABYLON.Vector4(0, 0.5, 0, 0.5);
    wheelUV[2] = new BABYLON.Vector4(0, 0, 1, 1);
    
    //car material
    const wheelMat = new BABYLON.StandardMaterial("wheelMat");
    wheelMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/wheel.png");

    const wheelRB = BABYLON.MeshBuilder.CreateCylinder("wheelRB", {diameter: 0.125, height: 0.05, faceUV: wheelUV, wrap: true})
    wheelRB.material = wheelMat;
    wheelRB.parent = car;
    wheelRB.position.z = -0.1;
    wheelRB.position.x = -0.2;
    wheelRB.position.y = 0.035;
    wheelRF = wheelRB.clone("wheelRF");
    wheelRF.position.x = 0.1;
    wheelLB = wheelRB.clone("wheelLB");
    wheelLB.position.y = -0.2 - 0.035;
    wheelLF = wheelRF.clone("wheelLF");
    wheelLF.position.y = -0.2 - 0.035;
    return {wheelRB, wheelRF, wheelLB, wheelLF};
}

function CarPolygon () {
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0));
    
    //base
    buildCar();
    return scene;
}

function CarPrototype () {
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0));
    const car = buildCar();
    buildWheels(car);
    car.rotation.x = - Math.PI / 2;
    // const boxChildAxes = localAxes(1, scene);
    // boxChildAxes.parent = car;
    // showAxis(6, scene);
    return scene;
}

/*
We will start with a wheel and rotate it about its axle. Remember that in order 
to have the car the upright we rotated it about the x axis and so the axle is 
along the y axis of the cylinder.

const animWheel = new BABYLON.Animation("wheelAnimation", "rotation.y", 
                  30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, 
                  BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

which has the parameters - name, property to animate, animation frames per 
second, property to animate type, loop mode, in this case repeat animation.

We follow this with the key frame array where we set values for the property 
to animate by frame number

const wheelKeys = [];

//At the animation key 0, the value of rotation.y is 0
wheelKeys.push({
  frame: 0,
  value: 0,
});

//At the animation key 30, (after 1 sec since animation fps = 30) the 
// value of rotation.y is 2PI for a complete rotation
wheelKeys.push({
  frame: 30,
  value: 2 * Math.PI,
});

Finally we link the key frame array to the animation, the animation 
to the mesh and begin it.

//set the keys
animWheel.setKeys(wheelKeys);

//Link this animation to the right back wheel
wheelRB.animations = [];
wheelRB.animations.push(animWheel);

//Begin animation - object to animate, first frame, last frame and loop if true
scene.beginAnimation(wheelRB, 0, 30, true);
*/

function AnimationRotationOneWheel () {
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 1.5, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0));
    
    //wheel face UVs
    const wheelUV = [];
    wheelUV[0] = new BABYLON.Vector4(0, 0, 1, 1);
    wheelUV[1] = new BABYLON.Vector4(0, 0.5, 0, 0.5);
    wheelUV[2] = new BABYLON.Vector4(0, 0, 1, 1);

    const wheelMat = new BABYLON.StandardMaterial("wheelMat");
    wheelMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/wheel.png");
    wheelRB = BABYLON.MeshBuilder.CreateCylinder("wheelRB", {diameter: 0.125, height: 0.05, faceUV: wheelUV})
    wheelRB.material = wheelMat;

    // ⭐Animate the Wheels
    // Create a new animation for wheel rotation
    // - "wheelAnimation": Name of this animation
    // - "rotation.y": Rotate around the vertical axis (Y)
    // - 30: Animation speed (30 frames per second)
    // - ANIMATIONTYPE_FLOAT: We're animating a number value (rotation angle)
    // - ANIMATIONLOOPMODE_CYCLE: Repeat animation continuously
    const fps = 30;
    const animWheel = new BABYLON.Animation("wheelAnimation", "rotation.y", fps, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    // Array to store key positions (keyframes) for our animation
    const wheelKeys = []; 

    // First keyframe: Starting position
    // At frame 0 (start of animation):
    //   rotation.y = 0 → Wheel begins at 0° (no rotation)
    wheelKeys.push({
        frame: 0,
        value: 0
    });

    // Second keyframe: Final position
    // At frame 30 (after 1 second since 30 fps):
    //   rotation.y = 2π → Wheel completes 360° (full circle)
    // Calculation: 30 frames ÷ 30 fps = 1 second per rotation
    wheelKeys.push({
        frame: fps,
        value: 4 * Math.PI
    });

    // Increase Rotation per Cycle (x2)
    // wheelKeys.push({
    //     frame: fps,
    //     value: 4 * Math.PI  // Double rotation: 720° (2 full turns) in 1 second
    // });

    // or
    // wheelKeys.push({
    //     frame: fps / 2,
    //     value: 2 * Math.PI  // Triple rotation: 1080° (3 full turns) in 2 seconds
    // });

    // Connect our keyframes to the animation
    animWheel.setKeys(wheelKeys);

    // Prepare the wheel object for animation
    // (Clear existing animations and add ours)
    wheelRB.animations = [];           // Reset animation list
    wheelRB.animations.push(animWheel); // Add our rotation animation

    // Start the animation on the wheel
    // Parameters:
    //   wheelRB: Our wheel object
    //   0: Start frame
    //   30: End frame
    //   true: Loop continuously
    // Effect: Wheel will rotate 360° every second, forever
    scene.beginAnimation(wheelRB, 0, fps, true);
    return scene;
}

function SetRotationAnimation (fps, rate, direction, clockwise, maxAngle) {
    // fps: Frame rate (frames per second) determining animation smoothness
    // rate: Animation speed multiplier
    // direction: x, y, z
    // clockwise: true for clockwise rotation, false for counter-clockwise
    const property = `rotation.${direction}`;
    const anim = new BABYLON.Animation(
        "RotationAnimation",
        property,
        fps,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    // Determine turn direction (positive for clockwise, negative for counter-clockwise)
    const CLOCKWISE = clockwise ? 1 : -1;

    // Calculate end value considering direction (clockwise: negative, CCW: positive)
    const endValue = CLOCKWISE * maxAngle * rate;
    
    // Set keyframes
    const keys = [
        { frame: 0, value: 0 },
        { frame: fps, value: endValue }
    ];
    anim.setKeys(keys);
    return anim;
}

// In a similar way to how we animated the wheels we now animate the car 
// to travel a straight line over 5 secs., stop for 2 secs. and then repeat.
function SetShiftAnimation (fps, direction, startposition, endposition, runningtime, stoptime) {
    // fps: Frame rate (frames per second) determining animation smoothness
    // rate: Animation speed multiplier, rate = 0 is not allowed
    // direction: x, y, z
    // runningtime: Total time for the car to move (in seconds)
    // stoptime: Time to pause at the end of the movement (in seconds)

    const property = `position.${direction}`;
    const animCar = new BABYLON.Animation(
        "carAnimation", 
        property, 
        fps, 
        BABYLON.Animation.ANIMATIONTYPE_FLOAT, 
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const carKeys = [];

    // Define keyframe sequence:
    // [0] Start position (- 4 * rate) at frame 0
    carKeys.push({frame: 0, value: startposition});

    // [1] Maximum displacement (+ 4 * rate) at frame `fps * runningtime`
    carKeys.push({frame: fps * runningtime, value: endposition});

    // [2] Maintain position (pause) through frame `fps * (runningtime + stoptime)`
    carKeys.push({frame: fps * (runningtime + stoptime), value: endposition});
    animCar.setKeys(carKeys);
    return animCar;
}

function AnimationRotationWheels () {
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 1.5, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0));
    const car = buildCar();
    const carwheels = buildWheels(car);
    car.rotation.x = - Math.PI / 2;
    
    const fps = 30;
    const animWheel = SetRotationAnimation(fps, 2, "y", true, 2 * Math.PI); // Create animation with fps and rate
    wheelRB = carwheels.wheelRB;
    wheelRF = carwheels.wheelRF;
    wheelLB = carwheels.wheelLB;
    wheelLF = carwheels.wheelLF;
    wheelRB.animations.push(animWheel);
    wheelLB.animations.push(animWheel);
    wheelRF.animations.push(animWheel);
    wheelLF.animations.push(animWheel);
    scene.beginAnimation(wheelRB, 0, fps, true);
    scene.beginAnimation(wheelRF, 0, fps, true);
    scene.beginAnimation(wheelLB, 0, fps, true);
    scene.beginAnimation(wheelLF, 0, fps, true);
    return {scene, car};
}

function AnimationShiftCar () {
    const value = AnimationRotationWheels();
    scene = value.scene;
    car = value.car;
    const fps = 30;
    const animCar = SetShiftAnimation(fps, "x", -2, 1, 1, 2);
    car.animations = [];
    car.animations.push(animCar);
    scene.beginAnimation(car, 0, 210, true);
    return scene;
}