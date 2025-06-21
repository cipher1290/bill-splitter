const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const groupRoutes = require('./routes/groupRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const paymentRoutes = require('./routes/paymentRoutes');


dotenv.config();
connectDB();


const PORT = process.env.PORT;
const app = express();


app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(groupRoutes);
app.use(expenseRoutes);
app.use(paymentRoutes);


//test route
app.get('/', (req, res) => {
    console.log('Inside homepage...');
    res.send('Kya haal hai bawe!!!');
})

app.listen(PORT, () => {
    console.log('Application is running...');
})