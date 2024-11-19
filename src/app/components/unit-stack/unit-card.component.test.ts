import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitStackComponent } from './unit-card.component';

describe('UnitStackComponent', () => {
  let component: UnitStackComponent;
  let fixture: ComponentFixture<UnitStackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnitStackComponent]
    });
    fixture = TestBed.createComponent(UnitStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
