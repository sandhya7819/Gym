const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, progressController.addProgress);
router.get('/', authMiddleware, progressController.getProgress);

module.exports = router;
