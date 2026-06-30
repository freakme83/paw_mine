import Phaser from 'phaser';
import { Player } from '../entities/Player';
import { GameState } from '../systems/GameState';
import { Market } from '../systems/Market';
import { ResourceManager } from '../systems/Resources';
import { Hud } from '../ui/Hud';

export class GameScene extends Phaser.Scene {
  private player!: Player;
  private state!: GameState;
  private resources!: ResourceManager;
  private market!: Market;
  private hud!: Hud;
  private mineKey!: Phaser.Input.Keyboard.Key;
  private sellKey!: Phaser.Input.Keyboard.Key;

  constructor() {
    super('GameScene');
  }

  preload(): void {
    this.createPixelTextures();
  }

  create(): void {
    this.physics.world.setBounds(0, 0, 800, 600);
    this.addMap();

    this.state = new GameState();
    this.resources = new ResourceManager(this);
    this.market = new Market(this);
    this.player = new Player(this, 140, 320);
    this.hud = new Hud(this, () => this.sleep());

    this.mineKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.sellKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    this.refreshHud('Welcome to Paw Mine Shelter lands. Mine copper, sell it, then sleep.');
  }

  update(): void {
    this.player.update();

    if (Phaser.Input.Keyboard.JustDown(this.mineKey)) {
      this.tryMine();
    }

    if (Phaser.Input.Keyboard.JustDown(this.sellKey)) {
      this.trySell();
    }
  }

  private createPixelTextures(): void {
    const graphics = this.make.graphics({ x: 0, y: 0 });
    graphics.fillStyle(0xf3b7c8);
    graphics.fillRect(8, 4, 16, 8);
    graphics.fillStyle(0x5a3d2b);
    graphics.fillRect(6, 12, 20, 18);
    graphics.fillStyle(0x2c1f18);
    graphics.fillRect(10, 6, 3, 3);
    graphics.fillRect(20, 6, 3, 3);
    graphics.generateTexture('player', 32, 32);
    graphics.destroy();
  }

  private addMap(): void {
    this.add.rectangle(400, 300, 800, 600, 0x8ccf7e);

    for (let x = 16; x < 800; x += 32) {
      for (let y = 80; y < 600; y += 32) {
        this.add.rectangle(x, y, 30, 30, (x + y) % 64 === 0 ? 0x7fbd71 : 0x92d384, 0.45);
      }
    }

    this.add.rectangle(144, 166, 142, 110, 0x8f5a3c).setStrokeStyle(4, 0x56351e);
    this.add.rectangle(144, 102, 160, 48, 0xc45c3b).setStrokeStyle(4, 0x763626);
    this.add.rectangle(118, 190, 28, 52, 0x4b2c20);
    this.add.rectangle(166, 162, 34, 28, 0x9fd3ff).setStrokeStyle(2, 0xffffff);
    this.add.text(86, 238, 'Cabin', {
      color: '#3b2418',
      fontSize: '16px',
      backgroundColor: '#f6d9a7',
      padding: { x: 8, y: 4 },
    });
  }

  private tryMine(): void {
    if (!this.isNear(this.resources.copperSpot, 92)) {
      this.refreshHud('Move closer to the copper vein before mining.');
      return;
    }

    const mined = this.state.mineCopper();
    this.refreshHud(mined ? 'Clink! You mined copper.' : 'Too tired or hungry to mine. Sleep soon.');
  }

  private trySell(): void {
    if (!this.isNear(this.market.area, 108)) {
      this.refreshHud('The market stall is too far away.');
      return;
    }

    const snapshot = this.state.snapshot();
    const sold = this.state.sellCopper();
    this.refreshHud(sold ? `Sold copper at ${snapshot.copperPrice} coins each.` : 'You have no copper to sell.');
  }

  private sleep(): void {
    this.state.sleep();
    this.refreshHud('A new day begins. Energy restored, hunger dropped, and copper price changed.');
  }

  private isNear(target: Phaser.GameObjects.Rectangle, distance: number): boolean {
    return Phaser.Math.Distance.Between(
      this.player.gameObject.x,
      this.player.gameObject.y,
      target.x,
      target.y,
    ) <= distance;
  }

  private refreshHud(message: string): void {
    this.hud.update(this.state.snapshot());
    this.hud.setMessage(message);
  }
}
