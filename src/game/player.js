import {Sprite} from 'phaser';

export default class Player extends Sprite {
  constructor(group, sprite, x, y, width = 100, height = 150) {
    super(group.game, x, y);

    // Assign to group. This adds a physics body.
    group.add(this);

    this.body.clearShapes();
    this.body.fixedRotation = true;

    // Create a stack of circles in the shape of a pill, filling the width and
    // height of the player. The distance between each center is <= r.
    // The origin is at the bottom center.
    const radius = width / 2;
    const count = Math.ceil(height / radius) - 1;
    const span = (height - width) / (count - 1);
    for (let i = 0; i < count; i++) {
      this.body.addCircle(radius, 0, -radius - span * i);
    }

    // this.body.setCollisionGroup(playerCollisionGroup);
    // this.body.collides(groundCollisionGroup);

    this.body.debug = true;
  }

  setCursors(cursors) {
    this.cursors = cursors;
  }

  update() {
    this.body.velocity.x = 0;

    if (this.cursors.left.isDown) {
      this.body.velocity.x = -500;
    } else if (this.cursors.right.isDown) {
      this.body.velocity.x = 500;
    }

    if (this.cursors.up.isDown /* && is on ground */) {
      this.body.velocity.y = -800;
    }
  }
}

