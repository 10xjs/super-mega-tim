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

  }

  update() {

  }

  render() {
    return <div/>;
  }
}
