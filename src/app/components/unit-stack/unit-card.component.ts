import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'unit-card',
  templateUrl: './unit-card.component.html',
  styleUrls: ['./unit-card.component.scss']
})
export class UnitCard implements OnInit {
  @Input() name: string;
  portrait: string;
  ngOnInit(): void {
    this.portrait = `assets/unit-images/${this.name.toLowerCase()}.png`;
  }
}
