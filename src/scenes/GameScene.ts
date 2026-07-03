import Phaser from 'phaser';
import { TextureFactory, TextureKeys } from '../art/TextureFactory';
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

  constructor() { super('GameScene'); }

  preload(): void { TextureFactory.create(this); }

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
    if (Phaser.Input.Keyboard.JustDown(this.mineKey)) this.tryMine();
    if (Phaser.Input.Keyboard.JustDown(this.sellKey)) this.trySell();
  }

  private addMap(): void {
    this.add.tileSprite(400, 300, 800, 600, TextureKeys.grass).setDepth(0);
    this.addDirtPath();
    this.addGroundDetails();
    this.addCabin();
    this.addCozyProps();
  }

  private addCabin(): void {
    this.add.image(144, 235, TextureKeys.shadowLarge).setDepth(90).setAlpha(0.75);
    this.add.image(144, 166, TextureKeys.cabin).setDepth(166);
    this.add.text(144, 252, 'Cabin', {
      color: '#3b2418',
      fontSize: '16px',
      fontFamily: 'monospace',
      backgroundColor: '#f6d9a7',
      padding: { x: 8, y: 4 },
    }).setOrigin(0.5).setDepth(1000);
  }

  private addDirtPath(): void {
    const path = this.add.graphics().setDepth(1);
    path.lineStyle(34, 0xb88b55, 0.62);
    path.beginPath();
    path.moveTo(126, 242);
    path.quadraticCurveTo(280, 312, 426, 278);
    path.quadraticCurveTo(544, 252, 608, 188);
    path.strokePath();
    path.lineStyle(24, 0xd0a66a, 0.45);
    path.beginPath();
    path.moveTo(124, 245);
    path.quadraticCurveTo(302, 334, 455, 355);
    path.quadraticCurveTo(556, 370, 606, 438);
    path.strokePath();
  }

  private addGroundDetails(): void {
    const flowers = [0xffffff, 0xffd1dc, 0xffe77a, 0xc8e6ff];
    for (let i = 0; i < 150; i += 1) {
      const x = Phaser.Math.Between(18, 782);
      const y = Phaser.Math.Between(86, 584);
      const g = this.add.graphics().setDepth(y - 5);
      const roll = i % 6;
      if (roll === 0) {
        g.fillStyle(0x6aa35d, 0.75).fillRect(x, y, 2, 7).fillRect(x + 4, y + 2, 2, 5);
      } else if (roll === 1) {
        g.fillStyle(flowers[i % flowers.length], 0.9).fillCircle(x, y, 2).fillStyle(0xf6cf5a).fillCircle(x, y, 1);
      } else if (roll === 2) {
        g.fillStyle(0xc9b06c, 0.65).fillRect(x, y, 9, 2).fillRect(x + 2, y + 3, 6, 2);
      } else if (roll === 3) {
        g.fillStyle(0x747a70, 0.65).fillEllipse(x, y, 8, 5);
      } else {
        g.fillStyle(i % 2 === 0 ? 0x74ad62 : 0x9bd482, 0.25).fillEllipse(x, y, Phaser.Math.Between(12, 30), Phaser.Math.Between(6, 16));
      }
    }
  }

  private addCozyProps(): void {
    const props: Array<[keyof typeof TextureKeys, number, number, number?]> = [
      ['fence', 52, 270], ['fence', 112, 270], ['barrel', 242, 204], ['crate', 242, 236],
      ['stump', 340, 470], ['shrub', 62, 518], ['shrub', 716, 318], ['stone', 484, 202], ['stone', 712, 544],
      ['catSign', 292, 118], ['yarn', 196, 286], ['yarn', 700, 418],
    ];
    props.forEach(([key, x, y, angle = 0]) => {
      this.add.image(x, y + 8, TextureKeys.shadowSmall).setDepth(y - 1).setAlpha(0.8);
      this.add.image(x, y, TextureKeys[key]).setDepth(y).setAngle(angle);
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
    return Phaser.Math.Distance.Between(this.player.gameObject.x, this.player.gameObject.y, target.x, target.y) <= distance;
  }

  private refreshHud(message: string): void {
    this.hud.update(this.state.snapshot());
    this.hud.setMessage(message);
  }
}
