/*
Title: Applicant Model
Author: Ahmed Ibrahim
Date: 2025-07-15
Description: Applicant model for SQLite database
*/

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(process.env.DB_PATH);

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS applicants (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        job_id INTEGER,
        full_name TEXT,
        email TEXT,
        phone TEXT,
        linkedin TEXT,
        education TEXT,
        experience TEXT,
        skills TEXT,
        cover_letter TEXT,
        position TEXT
    )`);
});

module.exports = {
    getByJob: (job_id, cb) => db.all('SELECT * FROM applicants WHERE job_id=?', [job_id], cb),
    getById: (id, cb) => db.get('SELECT * FROM applicants WHERE id=?', [id], cb),
    create: (data, cb) => db.run(
        `INSERT INTO applicants 
        (job_id, full_name, email, phone, linkedin, education, experience, skills, cover_letter, position)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            data.job_id, data.full_name, data.email, data.phone, data.linkedin,
            JSON.stringify(data.education), JSON.stringify(data.experience),
            JSON.stringify(data.skills), data.cover_letter, data.position
        ], cb
    )
};
