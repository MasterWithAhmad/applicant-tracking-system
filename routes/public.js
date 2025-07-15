/*
Title: Public Routes
Author: Ahmed Ibrahim
Date: 2025-07-15
Description: Routes for public job listing and application form
*/

const express = require('express');
const router = express.Router();
const publicController = require('../controllers/publicController');

router.get('/', publicController.jobList);
router.get('/jobs/:jobId/apply', publicController.applyPage);
router.post('/jobs/:jobId/apply', publicController.submitApplication);

module.exports = router;
