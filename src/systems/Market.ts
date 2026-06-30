import Phaser from 'phaser';

export class Market {
  readonly area: Phaser.GameObjects.Rectangle;

  constructor(scene: Phaser.Scene) {
    this.area = scene.add.rectangle(608, 440, 128, 96, 0xd6a34a).setStrokeStyle(4, 0x8a5a22);
    scene.add.rectangle(608, 402, 144, 18, 0xe85d75);
    scene.add.rectangle(568, 448, 28, 34, 0x7fb069);
    scene.add.rectangle(650, 448, 28, 34, 0x76c7c0);
    scene.add.text(548, 498, 'Market Stall\nPress F to Sell Copper', {
      color: '#3b2a16',
      align: 'center',
      fontSize: '14px',
      backgroundColor: '#fff0ba',
      padding: { x: 6, y: 4 },
    });
  }
}
