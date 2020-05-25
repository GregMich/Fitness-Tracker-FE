import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewResistanceTrainingSessionsComponent } from './view-resistance-training-sessions.component';

describe('ViewResistanceTrainingSessionsComponent', () => {
  let component: ViewResistanceTrainingSessionsComponent;
  let fixture: ComponentFixture<ViewResistanceTrainingSessionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewResistanceTrainingSessionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewResistanceTrainingSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
