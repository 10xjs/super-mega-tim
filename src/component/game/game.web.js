/* global require */
import {createElement, Component} from 'react';
import {findDOMNode} from 'react-dom';
import Phaser from 'phaser';

export default class Game extends Component {
  componentDidMount() {
    this.game = new Phaser.Game(
      800, 600,
      Phaser.AUTO,
      findDOMNode(this),
      {
        preload: ::this.preload,
        create: ::this.create,
        update: ::this.update,
      },
    );
  }

  preload() {
    this.game.load.image('sky', require('/asset/sky.png'));
    this.game.load.image('ground', require('/asset/platform.png'));
    this.game.load.image('star', require('/asset/star.png'));
    this.game.load.spritesheet('dude', require('/asset/dude.png'), 32, 48);
  }

  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.game.add.sprite(0, 0, 'sky');

    this.platforms = this.game.add.group();
    this.platforms.enableBody = true;

    const ground = this.platforms.create(0, this.game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;

    let ledge = this.platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;
    ledge = this.platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;

    this.player = this.game.add.sprite(32, this.game.world.height - 150, 'dude');

    //  We need to enable physics on the player
    this.game.physics.arcade.enable(this.player);

    //  Player physics properties. Give the little guy a slight bounce.
    this.player.body.bounce.y = 0.2;
    this.player.body.gravity.y = 400;
    this.player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    this.player.animations.add('left', [0, 1, 2, 3], 10, true);
    this.player.animations.add('right', [5, 6, 7, 8], 10, true);

    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.stars = this.game.add.group();

    this.stars.enableBody = true;

    for (let i = 0; i < 12; i++) {
      //  Create a star inside of the 'stars' group
      const star = this.stars.create(i * 70, 0, 'star');

      //  Let gravity do its thing
      star.body.gravity.y = 6;

      //  This just gives each star a slightly random bounce value
      star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

    this.scoreText = this.game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    this.score = 0;
  }

  update() {
    const hitPlatform = this.game.physics.arcade.collide(this.player, this.platforms);
    this.game.physics.arcade.collide(this.stars, this.platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.game.physics.arcade.overlap(this.player, this.stars, ::this.collectStar, null, this);

    //  Reset the players velocity (movement)
    this.player.body.velocity.x = 0;

    if (this.cursors.left.isDown) {
      //  Move to the left
      this.player.body.velocity.x = -150;

      this.player.animations.play('left');
    } else if (this.cursors.right.isDown) {
      //  Move to the right
      this.player.body.velocity.x = 150;

      this.player.animations.play('right');
    } else {
      //  Stand still
      this.player.animations.stop();

      this.player.frame = 4;
    }

    //  Allow the player to jump if they are touching the ground.
    if (this.cursors.up.isDown && this.player.body.touching.down && hitPlatform) {
      this.player.body.velocity.y = -350;
    }
  }

  collectStar(player, star) {
    // Removes the star from the screen
    star.kill();

    this.score += 10;
    this.scoreText.text = 'Score: ' + this.score;
  }

  render() {
    return <div/>;
  }
}
