import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { DatePipe } from "@angular/common";

@Component({
  selector: 'add-resistance-training-session',
  templateUrl: './add-resistance-training-session.component.html',
  styleUrls: ['./add-resistance-training-session.component.css']
})
export class AddResistanceTrainingSessionComponent implements OnInit {

  trainingSessionForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    // transforming current date to set to default to today
    let transformedDate = 
      new DatePipe(navigator.language)
       .transform(new Date(), 'y-MM-dd');
    this.trainingSessionForm = new FormGroup({
      date: new FormControl(transformedDate, []),
      excercises: new FormArray([])
    });
  }

  addExcercise() {
    console.log('Adding new excercise form group')
    this.excercises.push(new FormGroup({
      excerciseName: new FormControl('')
    }));
  }

  get excercises() {
    return this.trainingSessionForm.get("excercises") as FormArray;
  }

  removeExcercise(index: number)
  {
    this.excercises.removeAt(index);
  }

}
