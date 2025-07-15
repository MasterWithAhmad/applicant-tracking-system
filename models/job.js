/*
Title: Job Model
Author: Ahmed Ibrahim
Date: 2025-07-15
Description: Job model for SQLite database
*/

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(process.env.DB_PATH);

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS jobs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        description TEXT,
        deadline TEXT
    )`);
});

module.exports = {
    getAll: (cb) => db.all('SELECT * FROM jobs', cb),
    getById: (id, cb) => db.get('SELECT * FROM jobs WHERE id = ?', [id], cb),
    create: (data, cb) => db.run(
        'INSERT INTO jobs (title, description, deadline) VALUES (?, ?, ?)',
        [data.title, data.description, data.deadline], cb
    ),
    update: (id, data, cb) => db.run(
        'UPDATE jobs SET title=?, description=?, deadline=? WHERE id=?',
        [data.title, data.description, data.deadline, id], cb
    ),
    delete: (id, cb) => db.run('DELETE FROM jobs WHERE id=?', [id], cb)
};
