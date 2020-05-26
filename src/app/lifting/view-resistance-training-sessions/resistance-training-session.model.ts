export class ResistanceTrainingSessionModel {
    
    constructor(public resistanceTrainingSessionId: number,
        public trainingSessionDate: Date,
        public userId: number,
        public excercises: ExcerciseModel[]) { }
}

export class ExcerciseModel { 
    constructor(public excerciseId: number,
        public excerciseName: string,
        public resistanceTrainingSessionId: number,
        public sets: SetModel[]) { }
}

export class SetModel {
    constructor(public SetId: number,
        public reps: number,
        public weight: number,
        public weightUnit: string,
        public excerciseId: number,
        public rateOfPercievedExertion?: number) { }
}