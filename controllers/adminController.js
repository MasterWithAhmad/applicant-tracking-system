/*
Title: Admin Controller
Author: Ahmed Ibrahim
Date: 2025-07-15
Description: Handles admin authentication, job CRUD, and applicant viewing
*/

const jobModel = require('../models/job');
const applicantModel = require('../models/applicant');

// Render admin login page
exports.loginPage = (req, res) => {
    res.render('admin/login', { error: null });
};

// Handle admin login form submission
exports.login = (req, res) => {
    const { username, password } = req.body;
    if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
        req.session.admin = true;
        res.redirect('/admin/dashboard');
    } else {
        res.render('admin/login', { error: 'Invalid credentials' });
    }
};

// Log out admin and destroy session
exports.logout = (req, res) => {
    req.session.destroy(() => res.redirect('/admin/login'));
};

// Render admin dashboard with all jobs
exports.dashboard = (req, res) => {
    jobModel.getAll((err, jobs) => {
        res.render('admin/dashboard', { jobs });
    });
};

// Render form to create a new job
exports.newJobPage = (req, res) => {
    res.render('admin/newJob');
};

// Handle new job creation
exports.createJob = (req, res) => {
    jobModel.create(req.body, () => res.redirect('/admin/dashboard'));
};

// Render form to edit an existing job
exports.editJobPage = (req, res) => {
    jobModel.getById(req.params.id, (err, job) => {
        res.render('admin/editJob', { job });
    });
};

// Handle job update
exports.updateJob = (req, res) => {
    jobModel.update(req.params.id, req.body, () => res.redirect('/admin/dashboard'));
};

// Handle job deletion
exports.deleteJob = (req, res) => {
    jobModel.delete(req.params.id, () => res.redirect('/admin/dashboard'));
};

// List all applicants for a specific job
exports.viewApplicants = (req, res) => {
    applicantModel.getByJob(req.params.jobId, (err, applicants) => {
        res.render('admin/applicants', { applicants });
    });
};

// Show detailed CV for a specific applicant
exports.viewApplicantDetail = (req, res) => {
    applicantModel.getById(req.params.applicantId, (err, applicant) => {
        res.render('admin/applicantDetail', { applicant });
    });
};
