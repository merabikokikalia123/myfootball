import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoutingMmaComponent } from './scouting-mma.component';

describe('ScoutingMmaComponent', () => {
  let component: ScoutingMmaComponent;
  let fixture: ComponentFixture<ScoutingMmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScoutingMmaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoutingMmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
