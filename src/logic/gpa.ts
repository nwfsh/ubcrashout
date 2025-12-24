import type { UserCourse } from "../types/course";
import type { Course } from "../types/course";


function isGraded(c: UserCourse): boolean {
 return c.grade !== undefined; 
}

function isProjected(c: UserCourse): boolean {
    return c.expectedGrade !== undefined;
}

// cmap is a course catelog, this helps u collect the credits of each course from the usercourse
// cmap is in the form of <courseCode, Course>
// using formula (Σ (grade × credits)) / (Σ credits)
function calculatecurrentGPA(clist: UserCourse[], cmap: Map<string, Course> ): number {

    let totalCredits = 0;
    let totalWeightedScore = 0;
    
    for (const uc of clist) {
        if(!isGraded(uc)) {
            continue; // skip the loop
        }

        const course = cmap.get(uc.courseCode);
        if(!course) {
            continue; // done incase key doesnt exist 
        }

        const creds = course.credits;
        const score = uc.grade!; // ! means promise that it wont return undefined 
        totalCredits += creds;
        totalWeightedScore += creds * score;
    }

    if (totalCredits === 0) { // === for strict equality
        return 0;
    }

    return totalWeightedScore / totalCredits ;
}

function calculateProjectedGPA(clist: UserCourse[], cmap: Map<string, Course> ): number {

    let totalCredits = 0;
    let totalWeightedScore = 0;
    
    for (const uc of clist) {
        if(!isGraded(uc) && !isProjected(uc)) {
            continue; // skip the loop
        }

        const course = cmap.get(uc.courseCode);
        if(!course) {
            continue; // done i ncase key doesnt exist 
        }

        const creds = course.credits;

        let score: number;
        if( uc.grade !== undefined) {
            score = uc.grade;
        } else {
            score = uc.expectedGrade!;
        }

        totalCredits += creds;
        totalWeightedScore += creds * score;
    }

    if (totalCredits == 0) {
        return 0;
    }

    return totalWeightedScore / totalCredits ;
}