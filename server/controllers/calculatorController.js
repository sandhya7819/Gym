exports.calculateBMI = (req, res) => {
    const { weight, height } = req.body; // weight in kg, height in cm

    if (!weight || !height) {
        return res.status(400).json({ error: 'Please provide weight (kg) and height (cm)' });
    }

    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);

    let category = '';
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 24.9) category = 'Normal weight';
    else if (bmi < 29.9) category = 'Overweight';
    else category = 'Obesity';

    res.json({ bmi, category });
};

exports.calculateCalories = (req, res) => {
    const { weight, height, age, gender, activityLevel } = req.body;

    if (!weight || !height || !age || !gender || !activityLevel) {
        return res.status(400).json({ error: 'Please provide all details' });
    }

    // Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const activityMultipliers = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        veryActive: 1.9,
    };

    const tdee = Math.round(bmr * (activityMultipliers[activityLevel] || 1.2));

    res.json({ bmr: Math.round(bmr), tdee });
};
