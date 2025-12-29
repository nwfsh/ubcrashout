import { db } from "../db";
import type { UserCourse } from "../types/course";

const insertStmt = db.prepare(`
  INSERT INTO user_courses (id, user_id, course_code, term, status, grade, expected_grade)
  VALUES (@id, @userId, @courseCode, @term, @status, @grade, @expectedGrade)
`);

const selectByUserStmt = db.prepare(`
  SELECT id, user_id as userId, course_code as courseCode, term, status, grade, expected_grade as expectedGrade
  FROM user_courses
  WHERE user_id = ?
  ORDER BY term DESC
`);

export function addUserCourse(uc: UserCourse) {
  insertStmt.run({
    ...uc,
    grade: uc.grade ?? null, // as better-sqlite3 always expect all paramters to be filled, since u made these field optional
    expectedGrade: uc.expectedGrade ?? null, // these help them fill them with null if empty 
});
}

export function getUserCourses(userId: string): UserCourse[] {
  return selectByUserStmt.all(userId) as UserCourse[];
}