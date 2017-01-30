import Phaser from 'phaser';

import Ground from '/game/ground';
import Player from '/game/player';

export default class Game {
  constructor(domNode) {
    this.game = new Phaser.Game(800, 600, Phaser.AUTO, domNode, {
      preload: ::this.preload,
      create: ::this.create,
      update: ::this.update,
      render: ::this.render,
    });
  }

  preload() {
    this.game.time.advancedTiming = true;
  }

  create() {
    const cursors = this.game.input.keyboard.createCursorKeys();

    this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.game.physics.p2.setImpactEvents(true);
    this.game.physics.p2.restitution = 0.4;
    this.game.physics.p2.gravity.y = 900;

    const groundCollisionGroup = this.game.physics.p2.createCollisionGroup();
    const playerCollisionGroup = this.game.physics.p2.createCollisionGroup();

    this.game.physics.p2.updateBoundsCollisionGroup();

    const groundGroup = this.game.add.group();
    const playerGroup = this.game.add.group();

    groundGroup.enableBody = true;
    groundGroup.physicsBodyType = Phaser.Physics.P2JS;
    playerGroup.enableBody = true;
    playerGroup.physicsBodyType = Phaser.Physics.P2JS;

    const ground = new Ground(groundGroup, null, 300, 300, 400, 50);
    ground.body.setCollisionGroup(groundCollisionGroup);
    ground.body.collides(playerCollisionGroup);

    const player = new Player(playerGroup, null, 50, 200);
    player.body.setCollisionGroup(playerCollisionGroup);
    player.body.collides(groundCollisionGroup);
    player.setCursors(cursors);
  }

  update() {

  }

  render() {
    this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00ff00");
  }
}
