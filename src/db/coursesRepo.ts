import { db } from "../db";
import type { Course } from "../types/course";

const upsertStmt = db.prepare(`
    INSERT INTO courses (code, name, credits)
    VALUES( @code, @name, @credits)
    ON CONFLICT(code) DO UPDATE SET
    name = excluded.name,
    credits = excluded.credits
    `);

// db.prepare() compiles this SQL statement ONCE and returns a reusable function.
// This is more efficient than writing SQL every time we insert/update a row.

// db.prepare() compiles this SQL statement ONCE and returns a reusable function.
// This is more efficient than writing SQL every time we insert/update a row.

// @code, @name, @credits are named parameters.
// When we call upsertStmt.run(course), SQLite automatically matches:
//   @code    ← course.code
//   @name    ← course.name
//   @credits ← course.credits

// `excluded.column` refers to the values we *tried* to insert
// during a conflict (i.e. the new incoming values).

const getByCodeStmt = db.prepare(`
    SELECT code, name, credits
    FROM courses
    WHERE code = ?
`);

// notice that the top are helper functions for the bottom two 

export function upsertCourse(course: Course) {
    upsertStmt.run(course);
}

export function getCourseByCode(code: string): Course | undefined {
    return getByCodeStmt.get(code) as Course | undefined;
}