// THIS IS BASICALLY YOUR TEST FILE TO DO THIS

import "./db/init"; // to make sure to initialise db 
import type { UserCourse } from "./types/course";
import { addUserCourse, getUserCourses } from "./db/userCoursesRepo";
import { upsertCourse, getCourseByCode } from "./db/coursesRepo";
import { getGpaSummary } from "./logic/gpaService";

console.log(Math.floor(11.3));

upsertCourse( {
    code: "CPSC 221",
    name: "Basic Algorithm and Data Structures",
    credits: 4,
});

console.log("Course in catalog:", getCourseByCode("CPSC 221"));

const course1: UserCourse = {
  id: "aidan1",
  userId: "aidan",
  courseCode: "CPSC 221",
  term: "2024W2",
  status: "in_progress",
  expectedGrade: 85
};

addUserCourse(course1);

const courses = getUserCourses("aidan"); // tests to see if getting thigns from the database is working
console.log("From DB:", courses);
console.log("GPA Summary:", getGpaSummary("aidan"));