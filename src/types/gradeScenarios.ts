 
 export type GradeScenarios = {
    id: string;
    userCourseId: string;
    name: string;
    isDefault: boolean;
 }

 export type GradeScenarioComponents = {
    id: string;
    scenarioId: string;
    name: string;
    weight: number;
    grade?: number;
    expectedGrade?: number;
    useExpected: boolean;
 }

 // seperated when it came to db, as both of them have their own table !!