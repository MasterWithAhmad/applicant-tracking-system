/*
Title: Admin Routes
Author: Ahmed Ibrahim
Date: 2025-07-15
Description: Routes for admin dashboard and job/applicant management
*/

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

function isAuthenticated(req, res, next) {
    if (req.session.admin) return next();
    res.redirect('/admin/login');
}

router.get('/login', adminController.loginPage);
router.post('/login', adminController.login);
router.get('/logout', adminController.logout);

router.get('/dashboard', isAuthenticated, adminController.dashboard);
router.get('/jobs/new', isAuthenticated, adminController.newJobPage);
router.post('/jobs', isAuthenticated, adminController.createJob);
router.get('/jobs/:id/edit', isAuthenticated, adminController.editJobPage);
router.post('/jobs/:id', isAuthenticated, adminController.updateJob);
router.post('/jobs/:id/delete', isAuthenticated, adminController.deleteJob);

router.get('/jobs/:jobId/applicants', isAuthenticated, adminController.viewApplicants);
router.get('/applicants/:applicantId', isAuthenticated, adminController.viewApplicantDetail);

module.exports = router;
