import Phaser from 'phaser';
import { addInteractionLabel, TextureKeys } from '../art/TextureFactory';

export class Market {
  readonly area: Phaser.GameObjects.Rectangle;

  constructor(scene: Phaser.Scene) {
    scene.add.image(608, 458, TextureKeys.shadowLarge).setDepth(380).setAlpha(0.75);
    scene.add.image(608, 438, TextureKeys.market).setDepth(438);
    this.area = scene.add.rectangle(608, 440, 128, 96, 0x000000, 0);
    addInteractionLabel(scene, 'Market Stall\nPress F to Sell Copper', 608, 522);
  }
}
