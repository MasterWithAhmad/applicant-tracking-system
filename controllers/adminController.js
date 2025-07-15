/*
Title: Admin Controller
Author: Ahmed Ibrahim
Date: 2025-07-15
Description: Handles admin authentication, job CRUD, and applicant viewing
*/

const jobModel = require('../models/job');
const applicantModel = require('../models/applicant');

exports.loginPage = (req, res) => {
    res.render('admin/login', { error: null });
};

exports.login = (req, res) => {
    const { username, password } = req.body;
    if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
        req.session.admin = true;
        res.redirect('/admin/dashboard');
    } else {
        res.render('admin/login', { error: 'Invalid credentials' });
    }
};

exports.logout = (req, res) => {
    req.session.destroy(() => res.redirect('/admin/login'));
};

exports.dashboard = (req, res) => {
    jobModel.getAll((err, jobs) => {
        res.render('admin/dashboard', { jobs });
    });
};

exports.newJobPage = (req, res) => {
    res.render('admin/newJob');
};

exports.createJob = (req, res) => {
    jobModel.create(req.body, () => res.redirect('/admin/dashboard'));
};

exports.editJobPage = (req, res) => {
    jobModel.getById(req.params.id, (err, job) => {
        res.render('admin/editJob', { job });
    });
};

exports.updateJob = (req, res) => {
    jobModel.update(req.params.id, req.body, () => res.redirect('/admin/dashboard'));
};

exports.deleteJob = (req, res) => {
    jobModel.delete(req.params.id, () => res.redirect('/admin/dashboard'));
};

exports.viewApplicants = (req, res) => {
    applicantModel.getByJob(req.params.jobId, (err, applicants) => {
        res.render('admin/applicants', { applicants });
    });
};

exports.viewApplicantDetail = (req, res) => {
    applicantModel.getById(req.params.applicantId, (err, applicant) => {
        res.render('admin/applicantDetail', { applicant });
    });
};
