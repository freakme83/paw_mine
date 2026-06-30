import Phaser from 'phaser';
export interface StateSnapshot {
  day: number;
  energy: number;
  maxEnergy: number;
  hunger: number;
  maxHunger: number;
  coins: number;
  copper: number;
  copperPrice: number;
}

export class GameState {
  private state: StateSnapshot = {
    day: 1,
    energy: 100,
    maxEnergy: 100,
    hunger: 100,
    maxHunger: 100,
    coins: 25,
    copper: 0,
    copperPrice: 7,
  };

  snapshot(): StateSnapshot {
    return { ...this.state };
  }

  canMine(cost: number): boolean {
    return this.state.energy >= cost && this.state.hunger > 0;
  }

  mineCopper(): boolean {
    const energyCost = 12;
    if (!this.canMine(energyCost)) {
      return false;
    }

    this.state.energy -= energyCost;
    this.state.copper += Phaser.Math.Between(1, 3);
    return true;
  }

  sellCopper(): boolean {
    if (this.state.copper <= 0) {
      return false;
    }

    this.state.coins += this.state.copper * this.state.copperPrice;
    this.state.copper = 0;
    return true;
  }

  sleep(): void {
    this.state.day += 1;
    this.state.energy = this.state.maxEnergy;
    this.state.hunger = Math.max(0, this.state.hunger - 14);
    this.state.copperPrice = Phaser.Math.Between(4, 12);
  }
}
