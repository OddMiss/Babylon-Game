/*
(Getting Started - Chapter 6 - A Lathe Turned Fountain)
Time to introduce another of the many ways to create a mesh, the `CreateLathe` method.
*/

function LatheFountain() {
	const scene = new BABYLON.Scene(engine);
    // First, create a 2D curve
	const fountainProfile = [
		new BABYLON.Vector3(0, 0, 0),
		new BABYLON.Vector3(15, 0, 0),
        new BABYLON.Vector3(15, 4, 0),
		new BABYLON.Vector3(13, 4, 0),
        new BABYLON.Vector3(13, 1, 0),
        new BABYLON.Vector3(1, 2, 0),
		new BABYLON.Vector3(1, 15, 0),
		new BABYLON.Vector3(5, 17, 0)
	];
	// Create lathe. (i.e., rotate this curve)
	const fountain = BABYLON.MeshBuilder.CreateLathe("fountain", {shape: fountainProfile, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
	
	return scene;
}

function ValleyVillageFountain() {
    const scene = ValleyVillageWithSkyAndTrees();
    const fountainOutline = [
		new BABYLON.Vector3(0, 0, 0),
		new BABYLON.Vector3(0.5, 0, 0),
        new BABYLON.Vector3(0.5, 0.2, 0),
		new BABYLON.Vector3(0.4, 0.2, 0),
        new BABYLON.Vector3(0.4, 0.05, 0),
        new BABYLON.Vector3(0.05, 0.1, 0),
		new BABYLON.Vector3(0.05, 0.8, 0),
		new BABYLON.Vector3(0.15, 0.9, 0)
	];
	
	//Create lathed fountain
	const fountain = BABYLON.MeshBuilder.CreateLathe("fountain", {shape: fountainOutline, sideOrientation: BABYLON.Mesh.DOUBLESIDE});
    fountain.position.x = -4;
    fountain.position.z = -6;
    return scene;
}

/*
(Getting Started - Chapter 6 - Particle Spray)
In this case particles are small sprites emitted in a cluster, or cloud, to 
simulate used to simulate fire, smoke, water, or even faery dust.

The basis for a cloud of particles is the `ParticleSystem`. With this we specify 
the number of particles to use.
*/

function ParticleSpray() {
	const scene = LatheFountain();
    
    // Create a particle system
    var particleSystem = new BABYLON.ParticleSystem("particles", 10000, scene);

    // Texture of each particle
    /*
    Particles are emitted from a specifically defined region. Each particle is given 
    a lifetime and when reached it is reused and re-emitted.

    They are given a texture, which obviously governs their appearance,
    */
    particleSystem.particleTexture = new BABYLON.Texture("../Village/flare.png", scene);

    // Where the particles come from
    // The basic emitter region is a box of given dimensions around a specified point;
    // if minEmitBox != maxEmitBox, the emitter is a line
    // if minEmitBox == maxEmitBox, the emitter is a point
    particleSystem.emitter = new BABYLON.Vector3(0, 10, 0); // the starting object, the emitter
    particleSystem.minEmitBox = new BABYLON.Vector3(0, 2, 0); // Starting all from
    particleSystem.maxEmitBox = new BABYLON.Vector3(0, 2, 0); // To...

    // Colors of all particles
    // The third has the property colorDead and is of use when recycling of the 
    // particles is set to off. This third property is not needed for our fountain.
    particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
    particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
    // particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);

    // Size of each particle (random between...
    particleSystem.minSize = 0.1;
    particleSystem.maxSize = 0.5;

    // Life time of each particle (random between...
    particleSystem.minLifeTime = 2;
    particleSystem.maxLifeTime = 3.5;

    // Emission rate
    // We also need to set the number of particles emitted per second. 
    // ❓Too fast an emittance rate with a long lifetime can result in gaps in the 
    // emission of particles.
    particleSystem.emitRate = 1500;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    // Set the gravity of all particles
    // Setting a negative value for graving in the y component ensures the particles fall downwards.
    particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);

    // We also set two possible directions for the particles and affect 
    // the speed with which the particle travels by giving a minimum and 
    // maximum power value and an update speed.
    // Direction of each particle after it has been emitted
    particleSystem.direction1 = new BABYLON.Vector3(-2, 8, 2);
    particleSystem.direction2 = new BABYLON.Vector3(2, 8, -2);

    // Angular speed, in radians
    particleSystem.minAngularSpeed = 0;
    particleSystem.maxAngularSpeed = Math.PI;

    // Speed
    particleSystem.minEmitPower = 1.2;
    particleSystem.maxEmitPower = 1.8;
    particleSystem.updateSpeed = 0.025;

    // Start the particle system
    particleSystem.start();
	return scene;
}

function ValleyVillageSprayFountain() {
    const scene = ValleyVillageWithSkyAndTrees();
    ParticleSpray();
    return scene;
}