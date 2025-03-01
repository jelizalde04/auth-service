require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const emailVerificationRoutes = require('./routes/emailVerificationRoutes');
const connectDB = require('./db');

const app = express();

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(express.json());
app.use('/api/email-verification', emailVerificationRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 1004;
app.listen(PORT, () => {
    console.log(`🚀 Email Verification Token Microservice running on port ${PORT}`);
});
