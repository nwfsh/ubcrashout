// for all the course statuses
export type CourseStatus = | "planned" | "in_progress" | "completed" | "failed" | "withdrawn";


// defines a course
export type Course = {
    code: string;
    name: string;
    credits: number;
}

// defines the attempt of a user trying a course 
export type UserCourse = {
    id: string; // identifier for a single attempt of this specific course - needed

    userId: string; // user associated
    courseCode: string;

    term: string;

    status: CourseStatus;

    grade?: number;           // only if done/failed, assume 0-100 only
    expectedGrade?: number;   // only if future/inProgress
}