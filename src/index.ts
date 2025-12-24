import { UserCourse } from "./types/course";

console.log(Math.floor(11.3));

const course1: UserCourse = {
    id: "uc1",
    userId: "u1",
    courseCode: "CPSC 221",
    term: "2024W2",
    status: "in_progress",
    expectedGrade: 85
};

const userCourses: UserCourse[] = [course1];