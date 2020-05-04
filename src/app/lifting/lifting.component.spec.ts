import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiftingComponent } from './lifting.component';

describe('LiftingComponent', () => {
  let component: LiftingComponent;
  let fixture: ComponentFixture<LiftingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiftingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiftingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
