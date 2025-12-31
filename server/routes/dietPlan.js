const express = require('express');
const {
    createDietPlan,
    getAllDietPlans,
    getDietPlanById,
    updateDietPlan,
    deleteDietPlan,
} = require('../controllers/dietPlanController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getAllDietPlans);
router.get('/:id', authMiddleware, getDietPlanById);
router.post('/', authMiddleware, createDietPlan);
router.put('/:id', authMiddleware, updateDietPlan);
router.delete('/:id', authMiddleware, deleteDietPlan);

module.exports = router;
