import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResistanceTrainingSessionComponent } from './add-resistance-training-session.component';

describe('AddResistanceTrainingSessionComponent', () => {
  let component: AddResistanceTrainingSessionComponent;
  let fixture: ComponentFixture<AddResistanceTrainingSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddResistanceTrainingSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddResistanceTrainingSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
