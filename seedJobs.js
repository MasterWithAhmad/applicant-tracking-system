/*
Title: Seed Jobs Script
Author: Ahmed Ibrahim
Date: 2025-07-15
Description: Seeds the jobs table with initial realistic job postings
*/

require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(process.env.DB_PATH);

const jobs = [
  {
    title: 'Software Engineer',
    description: 'Develop and maintain web applications using Node.js, Express, and modern JavaScript frameworks. Collaborate with cross-functional teams to deliver high-quality software.',
    deadline: '2025-08-31'
  },
  {
    title: 'Data Analyst',
    description: 'Analyze large datasets to extract actionable insights. Build dashboards and reports to support business decisions. Proficiency in SQL and data visualization tools required.',
    deadline: '2025-09-15'
  },
  {
    title: 'Project Manager',
    description: 'Lead software development projects from inception to delivery. Manage timelines, coordinate teams, and ensure project goals are met. PMP certification is a plus.',
    deadline: '2025-09-10'
  },
  {
    title: 'UI/UX Designer',
    description: 'Design user interfaces and experiences for web and mobile applications. Create wireframes, prototypes, and collaborate with developers to implement designs.',
    deadline: '2025-08-25'
  },
  {
    title: 'DevOps Engineer',
    description: 'Implement CI/CD pipelines, manage cloud infrastructure, and automate deployment processes. Experience with AWS, Docker, and Kubernetes preferred.',
    deadline: '2025-09-05'
  }
];

db.serialize(() => {
  db.run('DELETE FROM jobs'); // Clear existing jobs
  const stmt = db.prepare('INSERT INTO jobs (title, description, deadline) VALUES (?, ?, ?)');
  jobs.forEach(job => {
    stmt.run(job.title, job.description, job.deadline);
  });
  stmt.finalize();
  console.log('Seeded jobs table with initial data.');
  db.close();
}); 