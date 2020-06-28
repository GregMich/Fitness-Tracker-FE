import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, PatternValidator } from '@angular/forms';
import { DatePipe } from "@angular/common";
import { MessageBannerService } from "../../MessageBanner/messageBannerService";
import { BannerMessage, BannerMessageType } from 'src/app/MessageBanner/messageBanner.model';
import { ResistanceTrainingSessionModel, ExcerciseModel } from "../view-resistance-training-sessions/resistance-training-session.model"
import { AuthService } from 'src/app/Auth/auth.service';
import { RestfulDataSource } from 'src/app/data/restful.datasource';
import { NewResistanceTrainingSessionService } from './new-resistance-training-session-service';

@Component({
  selector: 'add-resistance-training-session',
  templateUrl: './add-resistance-training-session.component.html',
  styleUrls: ['./add-resistance-training-session.component.css']
})
export class AddResistanceTrainingSessionComponent implements OnInit {

  trainingSessionForm: FormGroup;
  showForm: boolean = false;
  // TODO make this into some kind of generator function that automatically generates an
  // array in a range of values (probably using a lambda expression in the array lib)
  selectableReps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  selectableRpe = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  formProcessesing = false;
  private newTrainingSession;

  constructor(
    private messageBannerService: MessageBannerService,
    private auth: AuthService,
    private dataSource: RestfulDataSource,
    private newTrainingSessionService: NewResistanceTrainingSessionService) { }

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

    if (this.trainingSessionForm.valid) {
      console.log('training session form was valid');

      var newTrainingSessionModel = new ResistanceTrainingSessionModel(
        0,
        this.trainingSessionForm.value['date'],
        parseInt(this.auth.getUserId()),
        this.trainingSessionForm.value['excercises'],
        false
      );

      // cast types to correct values
      // TODO there MUST be a better way to take the form inputs and create
      // a model object out of them by using some kind of array lambda expression..
      newTrainingSessionModel.excercises.forEach(_ => {
        _.sets.forEach(s => {
          s.reps = +(s.reps),
          s.weight = +(s.weight),
          s.rateOfPercievedExertion = +(s.rateOfPercievedExertion)
          s.weightUnit = s.weightUnit == "Lb" ? "Pounds" : "Kilograms"
        });
      });

      console.log(newTrainingSessionModel);
      this.dataSource
       .createNewResistanceTrainingSession(newTrainingSessionModel)
       .subscribe(data => {
         console.log('Create new resistance training session call back');
         console.log(data);
         console.log('reporting new training session to observable service')
         this.newTrainingSessionService.reportNewResistanceTrainingSession(data);
         this.messageBannerService.reportMessage(
           new BannerMessage("Successfully created new training session", BannerMessageType.success))
         this.formProcessesing = false;
         this.initForm();
       }, error => {
         console.error(error);
         this.messageBannerService.reportMessage(
          new BannerMessage("There was an error creating the training session", BannerMessageType.error))
         this.formProcessesing = false;
       })

    }
  }

}
