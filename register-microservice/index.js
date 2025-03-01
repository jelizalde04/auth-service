require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const registerRoutes = require('./routes/registerRoutes');
const connectDB = require('./db');

const app = express();

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(express.json());
app.use('/api/register', registerRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 1002;
app.listen(PORT, () => {
    console.log(`🚀 Register Microservice running on port ${PORT}`);
});
