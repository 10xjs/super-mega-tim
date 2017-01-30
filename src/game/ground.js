import {Sprite} from 'phaser';

export default class Ground extends Sprite {
  constructor(group, sprite, x, y, width, height) {
    super(group.game, x, y);

    // Assign to group. This adds a physics body.
    group.add(this);

    this.body.setRectangle(width, height);
    this.body.static = true;
    this.body.allowSleep = true;

    this.body.debug = true;
  }

  update() {
    this.body.rotation += 0.01;
  }
}
