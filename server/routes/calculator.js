const express = require('express');
const { calculateBMI, calculateCalories } = require('../controllers/calculatorController');

const router = express.Router();

router.post('/bmi', calculateBMI);
router.post('/calories', calculateCalories);

module.exports = router;
