Happy Babylon Games 🎉!

# Notes (From official doc)

## Mesh
Whether you are creating a whole world or just placing one model into a web page you need a scene to contain the world or model, a camera to view it, a light to illuminate it and, of course, at least one viewable object as a model. All models, whether just a box or a complex character, are made from a mesh of triangles or facets.

A large number of meshes can be created directly within Babylon.js using code, or, as you will shortly see, imported as models from meshes created with other software. Let us start simply with a box.

Examples on these pages can be viewed in the playground, the place to try out Babylon.js live on the web, by clicking on their titles. To edit the code open them with

## Engine
All projects using the Babylon.js Engine need a scene with a camera and a light added. Then we can create our box.

Wait...what is the Babylon.js Engine you ask? Excellent question. The engine variable seen below is the class that's responsible for interfacing with lower-level APIs such as WebGL, Audio, etc. The constructor to create a Babylon scene (the context that renders visuals to the screen) needs the engine to talk to these lower level APIs. This is why the engine variable is needed when creating a scene.

You can read more about the engine class here.

## Coordinate system
- ←(-) →(+) width (x) (vertical),  ↑(+) ↓(-) height (y) (vertical), ↑(+) ↓(-) depth (z) (Horizon)

![alt text](/Images/Coordinate-System.png)

## Internal colors

```javascript
BABYLON.Color3.Red();
BABYLON.Color3.Green();
BABYLON.Color3.Blue();
BABYLON.Color3.Black();
BABYLON.Color3.White();
BABYLON.Color3.Purple();
BABYLON.Color3.Magenta();
BABYLON.Color3.Yellow();
BABYLON.Color3.Gray();
BABYLON.Color3.Teal();
```

## FaceUV

The image contains, in order, images of the same size for the front, right, back and left sides of the house. In the faceUV array faces are numbered 0 for back, 1 front, 2 right, 3 left, 4 top and 5 bottom.

The width of each image is 0.25 of the whole image width. To specify the part of the image to use we give two co-ordinates one for the lower left corner and one for the upper right corner. For the whole image we would use (0, 0) and (1, 1), for part images the co-ordinate values will be a fraction between 0 and 1.

Rather than using two sets of co-ordinates we use a 4 dimensional vector (lower left x, lower left y, upper right x, upper right y)

Matching sides to part images gives
front, 1, (0.0, 0.0, 0.25, 1.0)
right, 2, (0.25, 0, 0.5, 1.0)
back, 0, (0.5, 0.0, 0.75, 1.0)
left, 3, (0.75, 0, 1.0, 1.0)
as the top and bottom are not seen we will just use the defaults.

![alt text](/Images/FaceUV.png)

## MeshParents

1. synchronous position

```javascript
const boxParent = BABYLON.MeshBuilder.CreateBox("Box", {faceColors:faceColors});
const boxChild = BABYLON.MeshBuilder.CreateBox("Box", {size: 0.5, faceColors:faceColors});
boxChild.setParent(boxParent);
boxChild.position.x = 0;
boxChild.position.y = 2;
boxChild.position.z = 0;
boxParent.position.x = 2;
boxParent.position.y = 0;
boxParent.position.z = 0;
```

![alt text](/Images/ParentPosition.png)

2. synchronous position + rotation

```javascript
const boxParent = BABYLON.MeshBuilder.CreateBox("Box", {faceColors:faceColors});
const boxChild = BABYLON.MeshBuilder.CreateBox("Box", {size: 0.5, faceColors:faceColors});
boxChild.setParent(boxParent);
boxChild.position.x = 0;
boxChild.position.y = 2;
boxChild.position.z = 0;
boxParent.position.x = 2;
boxParent.position.y = 0;
boxParent.position.z = 0;
boxParent.rotation.x = 0; // New add, Rotation only for parent
boxParent.rotation.y = 0; // New add
boxParent.rotation.z = -Math.PI / 4; // New add
```

![alt text](/Images/ParentPositionRotation.png)

3. synchronous position + rotation (parent & child)

```javascript
const boxParent = BABYLON.MeshBuilder.CreateBox("Box", {faceColors:faceColors});
const boxChild = BABYLON.MeshBuilder.CreateBox("Box", {size: 0.5, faceColors:faceColors});
boxChild.setParent(boxParent);
boxChild.position.x = 0;
boxChild.position.y = 2;
boxChild.position.z = 0;
boxChild.rotation.x = Math.PI / 4; // New add, Rotation for child
boxChild.rotation.y = Math.PI / 4; // New add
boxChild.rotation.z = Math.PI / 4; // New add
boxParent.position.x = 2;
boxParent.position.y = 0;
boxParent.position.z = 0;
boxParent.rotation.x = 0;
boxParent.rotation.y = 0;
boxParent.rotation.z = -Math.PI / 4;
```

![alt text](/Images/ParentPositionRotation2.png)

## Rotation Rules

"right hand rule"

## movPOV direction

![alt text](/Images/movePOV.png)