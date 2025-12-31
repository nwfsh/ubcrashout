 
 export type GradeScenario = {
    id: string;
    userCourseId: string;
    name: string;
    isDefault: boolean;


 }

 export type GradeScenarioComponent = {
    id: string;
    scenarioId: string;
    name: string;
    weight: number;
    actualScore?: number;
    expectedScore?: number;
    useExpected: boolean;
 }