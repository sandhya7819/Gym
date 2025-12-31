const prisma = require('../utils/prisma');

// Create a new diet plan
exports.createDietPlan = async (req, res) => {
    const { name, description, calories, macros } = req.body;
    const userId = req.user.userId;

    try {
        const plan = await prisma.dietPlan.create({
            data: {
                name,
                description,
                calories: parseInt(calories),
                macros,
                creatorId: userId,
            },
        });
        res.status(201).json(plan);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create diet plan' });
    }
};

// Get all diet plans
exports.getAllDietPlans = async (req, res) => {
    try {
        const plans = await prisma.dietPlan.findMany({
            where: { creatorId: req.user.userId },
            include: { creator: { select: { name: true } } },
        });
        res.json(plans);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch diet plans' });
    }
};

// Get a single diet plan
exports.getDietPlanById = async (req, res) => {
    const { id } = req.params;
    try {
        const plan = await prisma.dietPlan.findUnique({
            where: { id },
            include: { creator: { select: { name: true } } },
        });
        if (!plan) return res.status(404).json({ error: 'Plan not found' });
        res.json(plan);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch plan' });
    }
};

// Update a diet plan
exports.updateDietPlan = async (req, res) => {
    const { id } = req.params;
    const { name, description, calories, macros } = req.body;
    const userId = req.user.userId;

    try {
        const plan = await prisma.dietPlan.findUnique({ where: { id } });
        if (!plan) return res.status(404).json({ error: 'Plan not found' });
        if (plan.creatorId !== userId && req.user.role !== 'ADMIN') {
            return res.status(403).json({ error: 'Not authorized' });
        }

        const updatedPlan = await prisma.dietPlan.update({
            where: { id },
            data: { name, description, calories: parseInt(calories), macros },
        });
        res.json(updatedPlan);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update plan' });
    }
};

// Delete a diet plan
exports.deleteDietPlan = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    try {
        const plan = await prisma.dietPlan.findUnique({ where: { id } });
        if (!plan) return res.status(404).json({ error: 'Plan not found' });
        if (plan.creatorId !== userId && req.user.role !== 'ADMIN') {
            return res.status(403).json({ error: 'Not authorized' });
        }

        await prisma.dietPlan.delete({ where: { id } });
        res.json({ message: 'Plan deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete plan' });
    }
};
