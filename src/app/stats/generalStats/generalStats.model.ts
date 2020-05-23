import { FormGroup, FormControl } from "@angular/forms";

export class GeneralStatsModel {

    constructor(
        public statsId: number,
        public userId: number,
        public weight: number,
        public weightUnit: string,
        public heightFeet: number,
        public heightInch: number,
        public age: number,
        public bodyfatPercentage: number) { }
        
}