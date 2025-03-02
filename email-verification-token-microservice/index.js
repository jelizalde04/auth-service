const express = require("express");
const http = require("http");
const cors = require("./middleware/corsMiddleware");
const emailVerificationRoutes = require("./routes/emailVerificationRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const { setupWebSocket } = require("./services/webSocketService");
const { setupRPC } = require("./services/rpcService");
const { setupSOAP } = require("./services/soapService");

const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json());
app.use(cors);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/email-verification", emailVerificationRoutes);

// Initialize WebSockets
setupWebSocket(server);

// Initialize RPC
setupRPC();

// Initialize SOAP Service
setupSOAP(app);

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: "Internal Server Error" });
});

// Start server on port 1004
server.listen(1004, () => console.log("Email Verification Token Microservice running on port 1004"));
