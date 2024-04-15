// routes/calculatorRoutes.js

import { Router } from 'express';
const router = Router();
import { calculateCarbonFootprint } from '../data/calculator.js';

// POST route for calculating carbon footprint
router.post('/calculate', (req, res) => {
    const data = req.body;
    const carbonFootprint = calculateCarbonFootprint(data);
    res.send(`Your total carbon footprint is: ${carbonFootprint}`);
});

export default router;
