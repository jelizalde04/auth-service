require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const loginRoutes = require('./routes/loginRoutes');
const connectDB = require('./db');

const app = express();

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(express.json());
app.use('/api/login', loginRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 1001;
app.listen(PORT, () => {
    console.log(`🚀 Login Microservice running on port ${PORT}`);
});
