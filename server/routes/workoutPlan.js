const express = require('express');
const {
    createWorkoutPlan,
    getAllWorkoutPlans,
    getWorkoutPlanById,
    updateWorkoutPlan,
    deleteWorkoutPlan,
} = require('../controllers/workoutPlanController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getAllWorkoutPlans);
router.get('/:id', authMiddleware, getWorkoutPlanById);
router.post('/', authMiddleware, createWorkoutPlan);
router.put('/:id', authMiddleware, updateWorkoutPlan);
router.delete('/:id', authMiddleware, deleteWorkoutPlan);

module.exports = router;
