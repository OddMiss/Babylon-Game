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

If you are using TypeScript then you can inject the earcut algorithm as the 
earcutInjection parameter on the extrudePolygon function.
*/

function Car () {
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0));
    
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

    //back formed automatically

    const car = BABYLON.MeshBuilder.ExtrudePolygon("car", {shape: outline, depth: 0.2});

    return scene;
}