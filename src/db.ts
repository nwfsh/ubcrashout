import Database from "better-sqlite3"; // load the SQLite driver library

export const db = new Database("data/app.db"); // if data/app.db exists → open it, if not create it
db.pragma("journal_mode = WAL"); // use the modern, safer default mode