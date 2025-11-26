/**
 * @author Mugen87 / https://github.com/Mugen87
 */
import { GameEntity } from './yuka.module.js';

class Ground extends GameEntity {

	constructor( geometry ) {

		super();
		this.geometry = geometry;

	}

	handleMessage() {

		// do nothing

		return true;

	}

}

export { Ground };
