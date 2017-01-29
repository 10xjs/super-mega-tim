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
        preload: this.preload,
        create: this.create,
        update: this.update,
      },
    );
  }

  preload() {

  }

  create() {

  }

  update() {

  }

  render() {
    return <div/>;
  }
}
