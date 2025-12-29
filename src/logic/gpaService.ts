// Service layer : A file that answers one business question using repos + logic
// Solves what issue : links the repos(data access) to the GPA(pure math) file
// so you dont have to keep repeating and doing everything in the index -- aka testing file
// Right now, index.ts is doing everything:
// fetching from DB
// building maps
// calling GPA logic
// printing output
// That’s fine temporarily — but it won’t scale.
// //The service:
// fetches data from repos
// prepares it (joins, maps, filtering)
// calls pure logic
// returns a clean result

import { getUserCourses } from "../db/userCoursesRepo";
import { getCourseMap } from "../db/coursesRepo";
import { calculatecurrentGPA, calculateProjectedGPA } from "../logic/gpa"

export type GpaSummary = {
    currentGpa: number;
    projectedGpa: number;
}

export function getGpaSummary(userId: string): GpaSummary {
    const personalCourses = getUserCourses(userId);
    const courseMap = getCourseMap();

    console.log("DEBUG attempts:", personalCourses);
    console.log("DEBUG courseMap keys:", [...courseMap.keys()]);
    console.log("DEBUG lookup CPSC 221:", courseMap.get("CPSC 221"));

    return {
        currentGpa: calculatecurrentGPA(personalCourses, courseMap),
        projectedGpa: calculateProjectedGPA(personalCourses, courseMap)
    };
}