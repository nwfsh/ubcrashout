import { db } from "../db";

// two tables, 1 course table, 1 user course table, 
db.exec(`
  CREATE TABLE IF NOT EXISTS courses (
    code TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    credits INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS user_courses (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    course_code TEXT NOT NULL,
    term TEXT NOT NULL,
    status TEXT NOT NULL,
    grade REAL,
    expected_grade REAL,
    FOREIGN KEY(course_code) REFERENCES courses(code)
  );

  CREATE INDEX IF NOT EXISTS idx_user_courses_user ON user_courses(user_id);
`);

console.log("DB initialized");

// so this helps u store, TEXT being the type, then PRIMARY KEY as what to access it
// NOT NULL to let database know it cannot be empty
// unique to let db know it has to be unique
// then DATETIME DEFAULT CURRENT_TIMESTAMP to store dates and keep the default to current

