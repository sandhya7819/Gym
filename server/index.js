const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routes Placeholder
app.get('/', (req, res) => {
    res.send('Gymguide API is running');
});

const authRoutes = require('./routes/auth');
const dietPlanRoutes = require('./routes/dietPlan');
const workoutPlanRoutes = require('./routes/workoutPlan');
const calculatorRoutes = require('./routes/calculator');
const progressRoutes = require('./routes/progress');

app.use('/api/auth', authRoutes);
app.use('/api/diet-plans', dietPlanRoutes);
app.use('/api/workout-plans', workoutPlanRoutes);
app.use('/api/calculator', calculatorRoutes);
app.use('/api/progress', progressRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
