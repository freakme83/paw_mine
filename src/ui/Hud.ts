import Phaser from 'phaser';
import type { StateSnapshot } from '../systems/GameState';

export class Hud {
  private readonly panel: Phaser.GameObjects.Rectangle;
  private readonly statsText: Phaser.GameObjects.Text;
  private readonly messageText: Phaser.GameObjects.Text;
  private readonly sleepButton: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, onSleep: () => void) {
    this.panel = scene.add.rectangle(400, 34, 780, 58, 0x233d35, 0.9).setScrollFactor(0);
    this.panel.setStrokeStyle(2, 0xf6d9a7);

    this.statsText = scene.add.text(20, 14, '', {
      color: '#fff7d6',
      fontSize: '18px',
    }).setScrollFactor(0);

    this.sleepButton = scene.add.text(660, 14, 'Sleep ▶', {
      color: '#ffffff',
      fontSize: '18px',
      backgroundColor: '#6f4e7c',
      padding: { x: 12, y: 8 },
    }).setScrollFactor(0).setInteractive({ useHandCursor: true });

    this.sleepButton.on('pointerdown', onSleep);

    this.messageText = scene.add.text(20, 552, 'Explore with WASD / Arrow Keys.', {
      color: '#fff7d6',
      fontSize: '16px',
      backgroundColor: '#233d35',
      padding: { x: 10, y: 6 },
    }).setScrollFactor(0);
  }

  update(snapshot: StateSnapshot): void {
    this.statsText.setText(
      `Day ${snapshot.day}   Energy ${snapshot.energy}/${snapshot.maxEnergy}   Hunger ${snapshot.hunger}/${snapshot.maxHunger}   Coins ${snapshot.coins}   Copper ${snapshot.copper}   Price ${snapshot.copperPrice}c`,
    );
  }

  setMessage(message: string): void {
    this.messageText.setText(message);
  }
}
