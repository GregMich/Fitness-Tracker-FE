import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, PatternValidator } from '@angular/forms';
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
  // TODO make this into some kind of generator function that automatically generates an
  // array in a range of values
  selectableReps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  selectableRpe = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  formProcessesing = false;

  constructor(private messageBannerService: MessageBannerService) { }

  ngOnInit(): void {
    this.initForm();
  }

  get excerciseName() {
    const ex = this.trainingSessionForm.get('excercises');
    const ex_name = ex.get('excerciseName');
    return ex_name;
  }

  addExcercise() {
    console.log('Adding new excercise form group')
    this.excercises.push(new FormGroup({
      excerciseName: new FormControl('',[
        Validators.required
      ]),
      sets: new FormArray([])
    }));
  }

  addSet(index) {
    const excercisesFormArray = this.trainingSessionForm.get("excercises") as FormArray;
    const controls = excercisesFormArray.controls[index];
    const sets = controls.get('sets') as FormArray;
    sets.push(new FormGroup({
      reps: new FormControl(''),
      weight: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')
      ]),
      weightUnit: new FormControl('Lb', [
        Validators.required
      ]),
      rateOfPercievedExertion: new FormControl('')
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

  removeSet(exIndex, setIndex)
  {
    console.log('REMOVE SET')
    console.log(exIndex + ' ' + setIndex);

    const excercisesFormArray = this.trainingSessionForm.get("excercises") as FormArray;
    const controls = excercisesFormArray.controls[exIndex];
    const sets = controls.get('sets') as FormArray;

    sets.removeAt(setIndex);
  }

  cancelAddExcercise() {
    this.initForm();
    this.formProcessesing = false;
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

  onFormSubmit() {
    console.log('form submitted')
    this.formProcessesing = true;
  }

}
