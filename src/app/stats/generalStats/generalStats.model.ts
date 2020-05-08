import { FormGroup, FormControl } from "@angular/forms";

export class GeneralStatsModel {

    constructor(
        public id: number,
        public userId: number,
        public weight: number,
        public weightUnit: number,
        public heightFeet: number,
        public heightInch: number,
        public age: number,
        public bodyfatPercentage: number) { }
        
}