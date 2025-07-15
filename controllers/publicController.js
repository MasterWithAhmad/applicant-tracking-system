/*
Title: Public Controller
Author: Ahmed Ibrahim
Date: 2025-07-15
Description: Handles public job listing and application form
*/

const jobModel = require('../models/job');
const applicantModel = require('../models/applicant');

exports.jobList = (req, res) => {
    jobModel.getAll((err, jobs) => {
        res.render('public/jobList', { jobs });
    });
};

exports.applyPage = (req, res) => {
    jobModel.getById(req.params.jobId, (err, job) => {
        res.render('public/apply', { job });
    });
};

exports.submitApplication = (req, res) => {
    const data = req.body;
    data.job_id = req.params.jobId;
    // Parse education, experience, skills from form
    data.education = JSON.parse(data.education);
    data.experience = JSON.parse(data.experience);
    data.skills = JSON.parse(data.skills);
    applicantModel.create(data, () => res.render('public/success'));
};
