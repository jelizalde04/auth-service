require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const resetPasswordRoutes = require('./routes/resetPasswordRoutes');
const connectDB = require('./db');

const app = express();

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(express.json());
app.use('/api/reset-password', resetPasswordRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 1003;
app.listen(PORT, () => {
    console.log(`🚀 Reset Password Microservice running on port ${PORT}`);
});
