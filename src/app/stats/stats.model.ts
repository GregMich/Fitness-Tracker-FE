export class StatsModel {

    constructor(
        public statsId: number,
        public userId: number,
        public weight: number,
        public weightUnit: number,
        public heightFeet: number,
        public heightInch: number,
        public age: number,
        public bodyfatPercentage: number) { }
}