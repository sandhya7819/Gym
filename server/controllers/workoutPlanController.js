const prisma = require('../utils/prisma');

// Create a new workout plan
exports.createWorkoutPlan = async (req, res) => {
    const { name, exercises, duration, difficulty } = req.body;
    const userId = req.user.userId;

    try {
        const plan = await prisma.workoutPlan.create({
            data: {
                name,
                exercises, // JSON object expected
                duration: parseInt(duration),
                difficulty,
                creatorId: userId,
            },
        });
        res.status(201).json(plan);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create workout plan' });
    }
};

// Get all workout plans
exports.getAllWorkoutPlans = async (req, res) => {
    try {
        const plans = await prisma.workoutPlan.findMany({
            where: { creatorId: req.user.userId },
            include: { creator: { select: { name: true } } },
        });
        res.json(plans);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch workout plans' });
    }
};

// Get a single workout plan
exports.getWorkoutPlanById = async (req, res) => {
    const { id } = req.params;
    try {
        const plan = await prisma.workoutPlan.findUnique({
            where: { id },
            include: { creator: { select: { name: true } } },
        });
        if (!plan) return res.status(404).json({ error: 'Plan not found' });
        res.json(plan);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch plan' });
    }
};

// Update a workout plan
exports.updateWorkoutPlan = async (req, res) => {
    const { id } = req.params;
    const { name, exercises, duration, difficulty } = req.body;
    const userId = req.user.userId;

    try {
        const plan = await prisma.workoutPlan.findUnique({ where: { id } });
        if (!plan) return res.status(404).json({ error: 'Plan not found' });
        if (plan.creatorId !== userId && req.user.role !== 'ADMIN') {
            return res.status(403).json({ error: 'Not authorized' });
        }

        const updatedPlan = await prisma.workoutPlan.update({
            where: { id },
            data: { name, exercises, duration: parseInt(duration), difficulty },
        });
        res.json(updatedPlan);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update plan' });
    }
};

// Delete a workout plan
exports.deleteWorkoutPlan = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    try {
        const plan = await prisma.workoutPlan.findUnique({ where: { id } });
        if (!plan) return res.status(404).json({ error: 'Plan not found' });
        if (plan.creatorId !== userId && req.user.role !== 'ADMIN') {
            return res.status(403).json({ error: 'Not authorized' });
        }

        await prisma.workoutPlan.delete({ where: { id } });
        res.json({ message: 'Plan deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete plan' });
    }
};
