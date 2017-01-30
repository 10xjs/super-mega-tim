import {Sprite} from 'phaser';

export default class Ground extends Sprite {
  constructor(state, sprite, x, y, width, height) {
    super(state.game, x, y);
    this.state = state;

    // Assign to group. This adds a physics body.
    state.groups.ground.add(this);

    this.body.clearShapes();
    this.body.allowSleep = true;
    this.body.static = true;

    this.bodyShape = this.body.addRectangle(width, height);

    this.body.setMaterial(state.materials.ground, this.bodyShape);

    this.body.setCollisionGroup(state.collisionGroups.ground);
    this.body.collides(state.collisionGroups.player);

    this.body.debug = true;
  }

  update() {
    this.body.rotation += 0.005;
  }
}
