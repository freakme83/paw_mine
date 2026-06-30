import Phaser from 'phaser';

export class ResourceManager {
  readonly copperSpot: Phaser.GameObjects.Rectangle;

  constructor(scene: Phaser.Scene) {
    this.copperSpot = scene.add.rectangle(608, 184, 96, 80, 0xb87333).setStrokeStyle(4, 0x704214);
    scene.add.rectangle(584, 160, 18, 18, 0xf4a460);
    scene.add.rectangle(620, 190, 24, 16, 0xd99058);
    scene.add.text(560, 230, 'Copper Vein\nPress E to Mine', {
      color: '#3d2213',
      align: 'center',
      fontSize: '14px',
      backgroundColor: '#f6d9a7',
      padding: { x: 6, y: 4 },
    });
  }
}
