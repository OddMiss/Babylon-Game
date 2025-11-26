/*
(Getting Started - Chapter 5 - Sprite Trees)
We are going to plant a couple of woods in our world each containing 500 trees. 
To maintain rendering speed we are going to use sprites. These are two dimensional 
images that will always face the camera.
*/

function BuildTrees(TreeObject, x, y, z) {
    // const tree = new BABYLON.Sprite("tree", spriteManagerTrees);
    TreeObject.position.x = x;
    TreeObject.position.z = z;
    TreeObject.position.y = y;
}

function ValleyVillageWithSkyAndTrees() {
    const scene = ValleyVillageWithSky();

    const spriteManagerTrees = new BABYLON.SpriteManager(
        "treesManager", "../Village/palmtree.png", 2000, {width: 512, height: 1024}, scene);

    //We create trees at random positions
    for (let i = 0; i < 500; i++) {
        const tree = new BABYLON.Sprite("tree", spriteManagerTrees);
        BuildTrees(tree, Math.random() * (-30), 0.5, Math.random() * 20 + 8)
    }

    for (let i = 0; i < 500; i++) {
        const tree = new BABYLON.Sprite("tree", spriteManagerTrees);
        BuildTrees(tree, Math.random() * (25) + 7, 0.5, Math.random() * -35  + 8)
    }
    const tree = new BABYLON.Sprite("tree", spriteManagerTrees);
    BuildTrees(tree, 1.5, 0.5, 1)

    return scene;
}