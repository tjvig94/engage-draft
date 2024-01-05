import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import arrayShuffle from 'array-shuffle';
import { units } from '../constants/units';
import * as R from 'ramda'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  unitStack: string[]

  pile1: string[]
  pile2: string[]
  pile3: string[]

  yourPool: string[]
  cpu1Pool: string[]
  cpu2Pool: string[]
  cpu3Pool: string[]

  viewPile1: WritableSignal<boolean> = signal(false)
  viewPile2: WritableSignal<boolean> = signal(false)
  viewPile3: WritableSignal<boolean> = signal(false)

  yourTurn: WritableSignal<boolean> = signal(true)
  
  ngOnInit(): void {
    this.unitStack = arrayShuffle(units);
    this.moveFromUnitStack(this.unitStack, this.pile1);
    this.moveFromUnitStack(this.unitStack, this.pile2);
    this.moveFromUnitStack(this.unitStack, this.pile3);
  }

  moveFromUnitStack(shuffledUnits: string[], pile: string[]): void {
    pile.push(shuffledUnits[0]);
    shuffledUnits.splice(0);
  }

  selectUnit(pile: string[], pool: string[], unitIndex: number, pileNum?: number): void {
    pool.push(pile[unitIndex]);
    pile.splice(unitIndex);
    if (pileNum) {
      this.hidePile(pileNum);
    }
  }

  viewPile(pile: number) {
    switch(pile) {
      case 1:
        this.viewPile1.set(true);
        break;
      case 2:
        this.viewPile2.set(true);
        break
      case 3:
        this.viewPile3.set(true);
        break;
    }
  }

  hidePile(pile: number) {
    switch(pile) {
      case 1:
        this.viewPile1.set(false);
        break;
      case 2:
        this.viewPile2.set(false);
        break
      case 3:
        this.viewPile3.set(false);
        break;
    }
  }

  cpuTurn(cpuPool: string[]): void {
    const initialPoolLength = R.clone(cpuPool.length)
    for (let i = 1; i < 5; i++) {
      switch(i) {
        case 1:
          if (!(Math.random() < 0.5)) {
            this.moveFromUnitStack(this.unitStack, this.pile1)
            break;
          }
          this.selectUnit(this.pile1, cpuPool, (Math.floor(Math.random() * this.pile1.length)))
          break;
        case 2:
          if (!(Math.random() < 0.5)) {
            this.moveFromUnitStack(this.unitStack, this.pile2)
            break;
          }
          this.selectUnit(this.pile2, cpuPool, (Math.floor(Math.random() * this.pile1.length)))
          break;
        case 3:
          if (!(Math.random() < 0.5)) {
            this.moveFromUnitStack(this.unitStack, this.pile3)
            break;
          }
          this.selectUnit(this.pile3, cpuPool, (Math.floor(Math.random() * this.pile1.length)))
          break;
        case 4:
          this.moveFromUnitStack(this.unitStack, cpuPool)
          break;
      }
      if (cpuPool.length !== initialPoolLength) break;
    }
  }
}
