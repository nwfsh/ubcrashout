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

  CREATE TABLE IF NOT EXISTS grade_scenarios (
    id TEXT PRIMARY KEY,
    user_course_id TEXT NOT NULL,
    name TEXT NOT NULL,
    is_default INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY(user_course_id) REFERENCES user_courses(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS scenario_components (
    id TEXT PRIMARY KEY,
    scenario_id TEXT NOT NULL,
    name TEXT NOT NULL,
    weight REAL NOT NULL,
    grade REAL,
    expected_grade REAL,
    use_expected INTEGER NOT NULL DEFAULT 1,
    FOREIGN KEY(scenario_id) REFERENCES grade_scenarios(id) ON DELETE CASCADE

  );

    CREATE INDEX IF NOT EXISTS idx_user_courses_user
    ON user_courses(user_id);

    CREATE INDEX IF NOT EXISTS idx_grade_scenarios_user_course
    ON grade_scenarios(user_course_id);

    CREATE INDEX IF NOT EXISTS idx_scenario_components_scenario
    ON scenario_components(scenario_id);
`);

console.log("DB initialized");



// so this helps u store, TEXT being the type, then PRIMARY KEY as what to access it
// NOT NULL to let database know it cannot be empty
// unique to let db know it has to be unique
// then DATETIME DEFAULT CURRENT_TIMESTAMP to store dates and keep the default to current

// INTEGER NOT NULL DEFAULT 1 means to make a boolean that default to true

// FOREIGN KEY(scenario_id) REFERENCES grade_scenarios(id) ON DELETE CASCADE
// this forms a relationship + If the parent scenario is deleted, automatically delete all its components.”

// CREATE INDEX IF NOT EXISTS idx_scenario_components_scenario
// ON scenario_components(scenario_id);
// means “Pre-organize scenario_components rows by scenario_id so I can find all components for a given scenario fast.”

