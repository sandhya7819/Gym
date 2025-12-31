const prisma = require('../utils/prisma');

exports.addProgress = async (req, res) => {
    const { weight, height } = req.body;
    const userId = req.user.userId; // Assuming middleware populates req.user

    if (!weight) {
        return res.status(400).json({ error: 'Weight is required' });
    }

    // Calculate BMI if height is provided, or try to fetch latest height
    let bmi = null;
    let currentHeight = height;

    try {
        if (!currentHeight) {
            const lastProgress = await prisma.userProgress.findFirst({
                where: { userId },
                orderBy: { createdAt: 'desc' },
            });
            if (lastProgress && lastProgress.height) {
                currentHeight = lastProgress.height;
            }
        }

        if (currentHeight && weight) {
            // BMI = weight(kg) / height(m)^2
            // Assuming height is in cm, convert to m
            const heightInMeters = currentHeight / 100;
            bmi = parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(2));
        }

        const progress = await prisma.userProgress.create({
            data: {
                userId,
                weight: parseFloat(weight),
                height: currentHeight ? parseFloat(currentHeight) : null,
                bmi,
            },
        });

        res.status(201).json(progress);
    } catch (error) {
        console.error('Error adding progress:', error);
        res.status(500).json({ error: 'Failed to add progress' });
    }
};

exports.getProgress = async (req, res) => {
    const userId = req.user.userId;

    try {
        const history = await prisma.userProgress.findMany({
            where: { userId },
            orderBy: { date: 'desc' },
            take: 20 // Limit to last 20 entries
        });
        res.json(history);
    } catch (error) {
        console.error('Error fetching progress:', error);
        res.status(500).json({ error: 'Failed to fetch progress' });
    }
};
