import Phaser from 'phaser';


export const TextureKeys = {
  grass: 'art-grass-tile',
  cabin: 'art-cabin',
  market: 'art-market',
  copperVein: 'art-copper-vein',
  playerIdle: 'player-idle',
  playerWalk1: 'player-walk-1',
  playerWalk2: 'player-walk-2',
  shadowSmall: 'shadow-small',
  shadowMedium: 'shadow-medium',
  shadowLarge: 'shadow-large',
  fence: 'prop-fence',
  barrel: 'prop-barrel',
  crate: 'prop-crate',
  stump: 'prop-stump',
  shrub: 'prop-shrub',
  stone: 'prop-stone',
  catSign: 'prop-cat-sign',
  yarn: 'prop-yarn',
} as const;

export class TextureFactory {
  static create(scene: Phaser.Scene): void {
    if (scene.textures.exists(TextureKeys.grass)) return;
    this.createGrass(scene);
    this.createShadows(scene);
    this.createCabin(scene);
    this.createMarket(scene);
    this.createCopperVein(scene);
    this.createPlayer(scene);
    this.createProps(scene);
  }

  private static graphics(scene: Phaser.Scene): Phaser.GameObjects.Graphics {
    return scene.make.graphics({ x: 0, y: 0 });
  }

  private static createGrass(scene: Phaser.Scene): void {
    const g = this.graphics(scene);
    g.fillStyle(0x86c875).fillRect(0, 0, 64, 64);
    const patches: Array<[number, number, number, number, number]> = [
      [4, 8, 20, 12, 0x7fbd6f], [36, 4, 18, 18, 0x94d182], [10, 38, 28, 18, 0x78b866],
      [44, 36, 14, 20, 0x9ad886], [26, 24, 10, 10, 0x6fac62],
    ];
    patches.forEach(([x, y, w, h, color]) => g.fillStyle(color, 0.45).fillRoundedRect(x, y, w, h, 5));
    for (let i = 0; i < 44; i += 1) {
      const x = (i * 17) % 64;
      const y = (i * 29 + 11) % 64;
      const color = i % 3 === 0 ? 0x6ea75d : i % 3 === 1 ? 0xb9de83 : 0x5f9b55;
      g.fillStyle(color, 0.55).fillRect(x, y, i % 2 === 0 ? 2 : 1, 1);
    }
    g.generateTexture(TextureKeys.grass, 64, 64);
    g.destroy();
  }

  private static createShadows(scene: Phaser.Scene): void {
    ([['shadow-small', 34, 12], ['shadow-medium', 96, 28], ['shadow-large', 170, 44]] as const).forEach(([key, w, h]) => {
      const g = this.graphics(scene);
      g.fillStyle(0x2a2319, 0.2).fillEllipse(w / 2, h / 2, w, h);
      g.generateTexture(key, w, h);
      g.destroy();
    });
  }

  private static createCabin(scene: Phaser.Scene): void {
    const g = this.graphics(scene);
    g.fillStyle(0x4a2b1c, 0.22).fillEllipse(92, 128, 170, 36);
    g.fillStyle(0x7a4a2d).fillRoundedRect(20, 58, 132, 78, 6);
    g.fillStyle(0x9a6441).fillRect(27, 66, 118, 9).fillRect(27, 88, 118, 7).fillRect(27, 110, 118, 7);
    g.lineStyle(2, 0x5c351f, 0.7).strokeRoundedRect(20, 58, 132, 78, 6);
    g.fillStyle(0xb84b35).fillTriangle(8, 66, 86, 10, 166, 66);
    g.fillStyle(0x893526).fillTriangle(30, 60, 86, 20, 144, 60);
    g.lineStyle(3, 0x64281e).strokeTriangle(8, 66, 86, 10, 166, 66);
    g.fillStyle(0x5b3123).fillRect(119, 24, 17, 30).fillStyle(0x77513a).fillRect(116, 20, 23, 8);
    g.fillStyle(0x4a2b20).fillRoundedRect(48, 86, 28, 50, 3);
    g.fillStyle(0xffcf75).fillCircle(68, 112, 3);
    g.fillStyle(0x9bd3dc).fillRoundedRect(102, 82, 30, 24, 2);
    g.lineStyle(2, 0xf9e4b2).strokeRoundedRect(102, 82, 30, 24, 2).lineBetween(117, 82, 117, 106).lineBetween(102, 94, 132, 94);
    g.fillStyle(0xffd98f).fillCircle(36, 84, 3).fillCircle(140, 74, 2);
    g.generateTexture(TextureKeys.cabin, 176, 148);
    g.destroy();
  }

  private static createMarket(scene: Phaser.Scene): void {
    const g = this.graphics(scene);
    g.fillStyle(0x4a2b1c, 0.2).fillEllipse(86, 116, 156, 34);
    g.fillStyle(0x9b6334).fillRoundedRect(22, 48, 128, 70, 5);
    g.fillStyle(0xf4d27d).fillRect(18, 30, 136, 24);
    for (let x = 18; x < 154; x += 24) g.fillStyle(x % 48 === 18 ? 0xdb5a64 : 0xffe0a0).fillRect(x, 30, 24, 28);
    g.lineStyle(3, 0x7f3941).strokeRoundedRect(16, 28, 140, 30, 4);
    g.fillStyle(0x5c3824).fillRect(32, 58, 8, 58).fillRect(132, 58, 8, 58);
    g.fillStyle(0x6f4528).fillRoundedRect(56, 8, 62, 20, 4);
    g.fillStyle(0xffe4a8).fillRect(64, 14, 46, 4).fillRect(76, 20, 22, 3);
    g.fillStyle(0x7fa75a).fillRoundedRect(42, 82, 30, 24, 2).fillStyle(0xc68b4a).fillRoundedRect(96, 82, 36, 26, 2);
    g.lineStyle(2, 0x5a371f).strokeRoundedRect(42, 82, 30, 24, 2).strokeRoundedRect(96, 82, 36, 26, 2);
    g.fillStyle(0xf0c36d).fillCircle(57, 78, 5).fillCircle(112, 78, 4).fillCircle(124, 77, 4);
    g.generateTexture(TextureKeys.market, 172, 132);
    g.destroy();
  }

  private static createCopperVein(scene: Phaser.Scene): void {
    const g = this.graphics(scene);
    g.fillStyle(0x2f271f, 0.2).fillEllipse(66, 76, 122, 30);
    g.fillStyle(0x6f6257).fillEllipse(60, 48, 106, 70).fillStyle(0x4f4942).fillEllipse(38, 58, 46, 34).fillEllipse(88, 45, 52, 42);
    g.lineStyle(4, 0x3e3935, 0.8).strokeEllipse(60, 48, 106, 70);
    g.lineStyle(5, 0xc8753f).lineBetween(22, 45, 50, 36).lineBetween(60, 66, 96, 54).lineBetween(68, 28, 106, 34);
    g.lineStyle(2, 0xffbc72).lineBetween(24, 43, 50, 35).lineBetween(61, 64, 95, 53).lineBetween(70, 27, 104, 33);
    g.fillStyle(0x8b7e70).fillCircle(18, 66, 8).fillCircle(106, 72, 10).fillCircle(113, 34, 7);
    g.generateTexture(TextureKeys.copperVein, 132, 96);
    g.destroy();
  }

  private static createPlayer(scene: Phaser.Scene): void {
    const makeFrame = (key: string, legOffset: number) => {
      const g = this.graphics(scene);
      g.fillStyle(0x2a2319, 0.22).fillEllipse(18, 35, 28, 9);
      g.fillStyle(0x523522).fillRoundedRect(10, 17, 16, 18, 4);
      g.fillStyle(0x2e2017).fillRect(11 + legOffset, 32, 5, 8).fillRect(21 - legOffset, 32, 5, 8);
      g.fillStyle(0xf1b5a4).fillCircle(18, 13, 10);
      g.fillStyle(0x7a4c32).fillRect(10, 5, 16, 6).fillRect(7, 10, 22, 5);
      g.fillStyle(0x221713).fillRect(14, 13, 2, 2).fillRect(21, 13, 2, 2);
      g.fillStyle(0xffd789).fillRect(17, 16, 3, 2);
      g.generateTexture(key, 36, 42);
      g.destroy();
    };
    makeFrame(TextureKeys.playerIdle, 0); makeFrame(TextureKeys.playerWalk1, -2); makeFrame(TextureKeys.playerWalk2, 2);
  }

  private static createProps(scene: Phaser.Scene): void {
    const rect = (key: string, w: number, h: number, draw: (g: Phaser.GameObjects.Graphics) => void) => { const g = this.graphics(scene); draw(g); g.generateTexture(key, w, h); g.destroy(); };
    rect(TextureKeys.fence, 60, 30, (g) => g.fillStyle(0x8a5a32).fillRect(0, 10, 60, 6).fillRect(0, 20, 60, 5).fillStyle(0x6d4327).fillRect(8, 2, 7, 26).fillRect(44, 2, 7, 26));
    rect(TextureKeys.barrel, 28, 34, (g) => g.fillStyle(0x7a4b2b).fillRoundedRect(4, 4, 20, 26, 6).fillStyle(0x9b653c).fillEllipse(14, 6, 20, 8).lineStyle(2, 0x3f2a1d).strokeRoundedRect(4, 4, 20, 26, 6).lineBetween(5, 13, 23, 13).lineBetween(5, 23, 23, 23));
    rect(TextureKeys.crate, 30, 28, (g) => g.fillStyle(0xb7783d).fillRect(3, 3, 24, 22).lineStyle(2, 0x6a3d20).strokeRect(3, 3, 24, 22).lineBetween(5, 5, 25, 23).lineBetween(25, 5, 5, 23));
    rect(TextureKeys.stump, 34, 30, (g) => g.fillStyle(0x7a4f2c).fillEllipse(17, 11, 26, 16).fillRect(6, 11, 22, 13).fillStyle(0xc18a51).fillEllipse(17, 10, 22, 12).lineStyle(2, 0x6a3d20).strokeEllipse(17, 10, 14, 7));
    rect(TextureKeys.shrub, 40, 30, (g) => g.fillStyle(0x4f9a52).fillCircle(13, 18, 11).fillCircle(24, 13, 13).fillCircle(29, 20, 9).fillStyle(0x7fc96d).fillCircle(20, 13, 3));
    rect(TextureKeys.stone, 28, 22, (g) => g.fillStyle(0x7f8278).fillEllipse(14, 12, 24, 15).fillStyle(0xa5a99d).fillEllipse(10, 8, 8, 4));
    rect(TextureKeys.catSign, 42, 44, (g) => g.fillStyle(0x5f3b25).fillRect(19, 22, 5, 20).fillStyle(0xd59b54).fillRoundedRect(4, 4, 34, 22, 4).fillStyle(0x3b2418).fillTriangle(13, 5, 17, 0, 21, 5).fillTriangle(22, 5, 26, 0, 30, 5).fillRect(15, 13, 2, 2).fillRect(26, 13, 2, 2).fillRect(20, 18, 6, 2));
    rect(TextureKeys.yarn, 26, 24, (g) => g.fillStyle(0xd96a9b).fillCircle(12, 12, 10).lineStyle(2, 0x9f3f6c).strokeCircle(12, 12, 7).lineBetween(5, 11, 19, 16).lineBetween(9, 4, 18, 20));
  }
}

export function addSoftShadow(scene: Phaser.Scene, x: number, y: number, texture = TextureKeys.shadowMedium): Phaser.GameObjects.Image {
  return scene.add.image(x, y, texture).setDepth(y - 1);
}

export function addInteractionLabel(scene: Phaser.Scene, text: string, x: number, y: number): Phaser.GameObjects.Text {
  return scene.add.text(x, y, text, {
    color: '#3b2a16', align: 'center', fontSize: '14px', fontFamily: 'monospace',
    backgroundColor: '#fff0ba', padding: { x: 6, y: 4 },
  }).setOrigin(0.5).setDepth(1000);
}
