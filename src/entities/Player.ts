import Phaser from 'phaser';
import { TextureKeys } from '../art/TextureFactory';

export class Player {
  private readonly sprite: Phaser.Physics.Arcade.Sprite;
  private readonly shadow: Phaser.GameObjects.Image;
  private readonly cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private readonly wasd: Record<'W' | 'A' | 'S' | 'D', Phaser.Input.Keyboard.Key>;
  private readonly speed = 150;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    if (!scene.anims.exists('player-walk')) {
      scene.anims.create({
        key: 'player-walk',
        frames: [{ key: TextureKeys.playerWalk1 }, { key: TextureKeys.playerIdle }, { key: TextureKeys.playerWalk2 }, { key: TextureKeys.playerIdle }],
        frameRate: 8,
        repeat: -1,
      });
    }

    this.shadow = scene.add.image(x, y + 18, TextureKeys.shadowSmall).setDepth(y - 1);
    this.sprite = scene.physics.add.sprite(x, y, TextureKeys.playerIdle);
    this.sprite.setCollideWorldBounds(true).setDepth(y);
    this.sprite.body?.setSize(18, 24).setOffset(9, 14);

    this.cursors = scene.input.keyboard!.createCursorKeys();
    this.wasd = scene.input.keyboard!.addKeys('W,A,S,D') as Record<'W' | 'A' | 'S' | 'D', Phaser.Input.Keyboard.Key>;
  }

  get gameObject(): Phaser.Physics.Arcade.Sprite { return this.sprite; }

  update(): void {
    const left = this.cursors.left.isDown || this.wasd.A.isDown;
    const right = this.cursors.right.isDown || this.wasd.D.isDown;
    const up = this.cursors.up.isDown || this.wasd.W.isDown;
    const down = this.cursors.down.isDown || this.wasd.S.isDown;
    const velocity = new Phaser.Math.Vector2(Number(right) - Number(left), Number(down) - Number(up));
    velocity.normalize().scale(this.speed);
    this.sprite.setVelocity(velocity.x, velocity.y);
    this.sprite.setDepth(this.sprite.y);
    this.shadow.setPosition(this.sprite.x, this.sprite.y + 18).setDepth(this.sprite.y - 1);
    if (velocity.lengthSq() > 0) {
      this.sprite.anims.play('player-walk', true);
      this.sprite.setFlipX(velocity.x < 0);
    } else {
      this.sprite.anims.stop();
      this.sprite.setTexture(TextureKeys.playerIdle);
    }
  }
}
