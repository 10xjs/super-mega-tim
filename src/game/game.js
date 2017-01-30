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

    this.groups = {};
    this.collisionGroups = {};
    this.materials = {};
  }

  preload() {
    this.game.time.advancedTiming = true;
  }

  configurePhysics() {
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.game.physics.p2.setImpactEvents(true);
    // this.game.physics.p2.restitution = 0.4;
    // this.game.physics.p2.gravity.y = 0;
  }

  createMaterials() {
    this.game.physics.p2.world.defaultContactMaterial.friction = 0.3;

    this.materials.world = new Phaser.Physics.P2.Material('worldMaterial');
    this.materials.player = new Phaser.Physics.P2.Material('playerMaterial');
    this.materials.ground = new Phaser.Physics.P2.Material('groundMaterial');

    this.materials.playerWorld = this.game.physics.p2.createContactMaterial(
      this.materials.player,
      this.materials.world,
      {
        friction: 0,
        restitution: 0.0,
        stiffness: 1e7,
        relaxation: 3,
        frictionStiffness: 1e7,
        frictionRelaxation: 3,
        surfaceVelocity: 0,
      },
    );

    this.materials.playerGround = this.game.physics.p2.createContactMaterial(
      this.materials.player,
      this.materials.ground,
      {
        friction: 0,
        restitution: 0.0,
        stiffness: 1e7,
        relaxation: 3,
        frictionStiffness: 1e7,
        frictionRelaxation: 3,
        surfaceVelocity: 0,
      },
    );
  }

  createCollisionGroups() {
    this.collisionGroups.ground = this.game.physics.p2.createCollisionGroup();
    this.collisionGroups.player = this.game.physics.p2.createCollisionGroup();
    this.game.physics.p2.updateBoundsCollisionGroup();
  }

  createGroups() {
    // Ground group.
    this.groups.ground = this.game.add.group();
    this.groups.ground.enableBody = true;
    this.groups.ground.physicsBodyType = Phaser.Physics.P2JS;

    // Player group.
    this.groups.player = this.game.add.group();
    this.groups.player.enableBody = true;
    this.groups.player.physicsBodyType = Phaser.Physics.P2JS;
  }

  configureWorld() {
    this.game.physics.p2.setWorldMaterial(
      this.materials.world,
      true, true, true, true,
    );
  }

  createEntities() {
    const ground = new Ground(this, null, 300, 300, 400, 50);
    this.player = new Player(this, null, 50, 200);
  }

  create() {
    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.configurePhysics();
    this.createMaterials();
    this.createCollisionGroups();
    this.createGroups();
    this.configureWorld();
    this.createEntities();
  }

  update() {

  }

  render() {
    this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00ff00");
  }
}
