import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { DatePipe } from "@angular/common";
import { MessageBannerService } from "../../MessageBanner/messageBannerService";
import { BannerMessage, BannerMessageType } from 'src/app/MessageBanner/messageBanner.model';

@Component({
  selector: 'add-resistance-training-session',
  templateUrl: './add-resistance-training-session.component.html',
  styleUrls: ['./add-resistance-training-session.component.css']
})
export class AddResistanceTrainingSessionComponent implements OnInit {

  trainingSessionForm: FormGroup;
  showForm: boolean = false;

  constructor(private messageBannerService: MessageBannerService) { }

  ngOnInit(): void {
    this.initForm();
  }

  addExcercise() {
    console.log('Adding new excercise form group')
    this.excercises.push(new FormGroup({
      excerciseName: new FormControl(''),
      sets: new FormArray([])
    }));
  }

  addSet(index) {
    const excercisesFormArray = this.trainingSessionForm.get("excercises") as FormArray;
    const controls = excercisesFormArray.controls[index];
    const sets = controls.get('sets') as FormArray;
    sets.push(new FormGroup({
      testName: new FormControl('hello world')
    }))
    console.log(sets);
  }

  get excercises() {
    return this.trainingSessionForm.get("excercises") as FormArray;
  }

  getSets(index) {
    console.log('getting sets');
    const excercisesFormArray = this.trainingSessionForm.get("excercises") as FormArray;
    const controls = excercisesFormArray.controls[index];
    const sets = controls.get('sets') as FormArray;
    console.log(sets);
    console.log(sets.controls);
    return sets;
  }

  removeExcercise(index: number)
  {
    this.excercises.removeAt(index);
  }

  cancelAddExcercise() {
    this.initForm();
    this.messageBannerService.reportMessage(
      new BannerMessage("Add new training session cancelled", BannerMessageType.info));
  }

  private initForm() {
    // transforming current date to set to default to today
    let transformedDate = 
    new DatePipe(navigator.language)
     .transform(new Date(), 'y-MM-dd');
    this.showForm = false;
    this.trainingSessionForm = new FormGroup({
      date: new FormControl(transformedDate, []),
      excercises: new FormArray([])
    });
  }

}
