const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const controller = require('../controllers/formsController');

router.post('/hire', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').optional({ checkFalsy: true }).isEmail().withMessage('Invalid email'),
  body('phone').optional({ checkFalsy: true }).isString(),
], controller.createHireRequest);

router.post('/become-helper', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').optional({ checkFalsy: true }).isEmail().withMessage('Invalid email'),
  body('skills').optional({ checkFalsy: true }).isString(),
], controller.createBecomeHelper);

router.post('/quick-inquiry', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('message').trim().notEmpty().withMessage('Message is required'),
  body('email').optional({ checkFalsy: true }).isEmail().withMessage('Invalid email'),
], controller.createQuickInquiry);

module.exports = router;
