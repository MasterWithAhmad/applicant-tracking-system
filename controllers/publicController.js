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
    function safeParse(val) {
        if (!val) return [];
        if (typeof val === 'string') {
            try {
                return JSON.parse(val);
            } catch (e) {
                return [];
            }
        }
        if (typeof val === 'object') return val;
        return [];
    }
    data.education = safeParse(data.education);
    data.experience = safeParse(data.experience);
    data.skills = safeParse(data.skills);
    applicantModel.create(data, () => res.render('public/success'));
};
