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

  pile1: string[] = []
  pile2: string[] = []
  pile3: string[] = []

  yourPool: WritableSignal<string[]> = signal([])
  cpu1Pool: WritableSignal<string[]> = signal([])
  cpu2Pool: WritableSignal<string[]> = signal([])
  cpu3Pool: WritableSignal<string[]> = signal([])

  viewPile1: WritableSignal<boolean> = signal(false)
  viewPile2: WritableSignal<boolean> = signal(false)
  viewPile3: WritableSignal<boolean> = signal(false)

  viewedPile1: WritableSignal<boolean> = signal(false)
  viewedPile2: WritableSignal<boolean> = signal(false)
  viewedPile3: WritableSignal<boolean> = signal(false)

  yourTurn: WritableSignal<boolean> = signal(false)
  cpuTurn: WritableSignal<boolean> = signal(false)
  
  ngOnInit(): void {
    this.unitStack = arrayShuffle(units);
    this.moveFromUnitStackToPile(1);
    this.moveFromUnitStackToPile(2);
    this.moveFromUnitStackToPile(3);
  }

  endTurn() {
    this.yourTurn.set(false)
    this.viewedPile1.set(false)
    this.viewedPile2.set(false)
    this.viewedPile3.set(false)
    this.takeCPUTurn(this.cpu1Pool)
    this.takeCPUTurn(this.cpu2Pool)
    this.takeCPUTurn(this.cpu3Pool)
  }

  moveFromUnitStackToPile(pileNum: number): void {
    if (this.unitStack.length === 0) return;
    switch(pileNum) {
      case 1:
        this.pile1.push(this.unitStack[0])
        break;
      case 2:
        this.pile2.push(this.unitStack[0])
        break;
      case 3:
        this.pile3.push(this.unitStack[0])
        break;
      default:
        throw Error("unrecognized pile number in moveFromUnitStack")
    }
    this.unitStack.splice(0,1);
  }

  moveUnitFromStackToPool(pool: WritableSignal<string[]>) {
    pool.mutate(units => units.push(this.unitStack[0]))
    this.unitStack.splice(0,1)
  }

  selectUnit(pile: string[], pool: WritableSignal<string[]>, unitIndex: number, pileNum?: number): void {
    pool.mutate(units => units.push(pile[unitIndex]))
    pile.splice(unitIndex,1);
    console.log('selected unit', pile[unitIndex])
    if (pileNum) {
      this.hidePile(pileNum);
    }
  }

  viewPile(pileNum: number) {
    switch(pileNum) {
      case 1:
        this.viewPile1.set(true);
        break;
      case 2:
        this.viewPile2.set(true);
        break
      case 3:
        this.viewPile3.set(true);
        break;
      default:
        throw Error('unrecognized pile number in viewPile')
    }
  }

  hidePile(pileNum: number) {
    switch(pileNum) {
      case 1:
        this.viewPile1.set(false);
        break;
      case 2:
        this.viewPile2.set(false);
        break
      case 3:
        this.viewPile3.set(false);
        break;
      default:
        throw Error('unrecognized pile number in hidePile')
    }
  }

  doNotSelect(pileNum: number) {
    this.hidePile(pileNum)
    this.moveFromUnitStackToPile(pileNum)
    switch(pileNum) {
      case 1:
        this.viewedPile1.set(true)
        break;
      case 2:
        this.viewedPile2.set(true)
        break;
      case 3:
        this.viewedPile3.set(true)
        break;
      default:
        throw Error('unrecognized pile number in doNotSelect')
    }
  }

  takeCPUTurn(cpuPool: WritableSignal<string[]>): void {
    this.cpuTurn.set(true)
    const initialPoolLength = R.clone(cpuPool.length)
    for (let i = 1; i < 5; i++) {
      switch(i) {
        case 1:
          if ((Math.random() < 0.5)) {
            this.moveFromUnitStackToPile(1)
            console.log('cpu added to pile 1')
            break;
          }
          this.selectUnit(this.pile1, cpuPool, (Math.floor(Math.random() * this.pile1.length)))
          this.moveFromUnitStackToPile(1)
          console.log('cpu took from pile 1')
          return;
        case 2:
          if (!(Math.random() < 0.5)) {
            this.moveFromUnitStackToPile(2)
            console.log('cpu added to pile 2')
            break;
          }
          this.selectUnit(this.pile2, cpuPool, (Math.floor(Math.random() * this.pile2.length)))
          this.moveFromUnitStackToPile(2)
          console.log('cpu took from pile 2')
          return;
        case 3:
          if (!(Math.random() < 0.5)) {
            this.moveFromUnitStackToPile(3)
            console.log('cpu added to pile 3')
            break;
          }
          this.selectUnit(this.pile3, cpuPool, (Math.floor(Math.random() * this.pile3.length)))
          this.moveFromUnitStackToPile(3)
          console.log('cpu took from pile 3')
          return;
        case 4:
          this.moveUnitFromStackToPool(cpuPool)
          console.log('cpu took from the shuffled stack')
          break;
      }
      if (cpuPool.length !== initialPoolLength) break;
    }
    this.cpuTurn.set(false)
  }
}
