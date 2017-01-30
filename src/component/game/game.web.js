import {createElement, Component} from 'react';
import {findDOMNode} from 'react-dom';
import PhaserGame from '/game';

export default class Game extends Component {
  componentDidMount() {
    this.game = new PhaserGame(findDOMNode(this));
  }
  render() {
    return <div/>;
  }
}
