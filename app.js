import express from 'express';
import calculatorRoutes from './routes/calculator.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(calculatorRoutes); 

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
