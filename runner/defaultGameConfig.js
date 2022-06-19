import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'canvas-container',
  width: 1170 * (19.5 / 9),
  height: 1170,
  scale: {
    mode: Phaser.Scale.FIT,
  },
  physics: {
    default: 'matter',
    matter: {
        gravity: {
            y: 0
        },
        debug: false
    }
},
}