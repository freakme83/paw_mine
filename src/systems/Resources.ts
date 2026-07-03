import Phaser from 'phaser';
import { addInteractionLabel, TextureKeys } from '../art/TextureFactory';

export class ResourceManager {
  readonly copperSpot: Phaser.GameObjects.Rectangle;

  constructor(scene: Phaser.Scene) {
    scene.add.image(608, 194, TextureKeys.shadowMedium).setDepth(150).setAlpha(0.65);
    scene.add.image(608, 184, TextureKeys.copperVein).setDepth(184);
    this.copperSpot = scene.add.rectangle(608, 184, 112, 82, 0x000000, 0);
    addInteractionLabel(scene, 'Copper Vein\nPress E to Mine', 608, 250);
  }
}
