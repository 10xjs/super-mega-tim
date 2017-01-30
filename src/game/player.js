/* global p2 */
/* eslint-disable max-len */
import {Sprite} from 'phaser';

const WIDTH = 100;
const HEIGHT = 150;
const SENSOR_DEPTH = 25;

export default class Player extends Sprite {
  constructor(state, sprite, x, y) {
    super(state.game, x, y);
    this.state = state;

    // Assign to group. This adds a physics body.
    state.groups.player.add(this);

    this.body.clearShapes();
    this.body.fixedRotation = true;

    const radius = WIDTH / 2;
    const length = HEIGHT - WIDTH;
    const angle = Math.PI / 2;

    this.bodyShape = this.body.addCapsule(length, radius, 0, 0, angle);

    this.body.setMaterial(state.materials.player, this.bodyShape);

    this.body.setCollisionGroup(state.collisionGroups.player);
    this.body.collides(state.collisionGroups.ground, this.collideGround, this);

    this.body.debug = true;
  }

  collideGround() {
    // console.log('collideGround');
  }

  onGround() {
    const contacts = this.game.physics.p2.world.narrowphase.contactEquations;

    for (let i = 0, len = contacts.length; i < len; i++) {
      const contact = contacts[i];

      if (contact.bodyA === this.body.data || contact.bodyB === this.body.data) {
        let direction = p2.vec2.dot(contact.normalA, p2.vec2.fromValues(0, 1));

        if (contact.bodyA === this.body.data) {
          direction *= -1;
        }

        if (direction > 0.5) {
          return true;
        }
      }
    }

    return false;
  }

  update() {
    const onGround = this.onGround();

    if (onGround) {
      this.body.velocity.x /= 10;
    }

    if (this.state.cursors.left.isDown) {
      this.body.velocity.x = -500;
    } else if (this.state.cursors.right.isDown) {
      this.body.velocity.x = 500;
    }

    if (this.state.cursors.up.isDown && onGround && !this._jump) {
      this._jump = true;
      this.body.velocity.y = -1000;
    }

    if (!this.state.cursors.up.isDown) {
      this._jump = false;
    }
  }
}
