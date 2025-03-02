const express = require("express");
const http = require("http");
const cors = require("./middleware/corsMiddleware");
const loginRoutes = require("./routes/loginRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const { setupWebSocket } = require("./services/webSocketService");
const { setupRPC } = require("./services/rpcService");

const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json());
app.use(cors);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/login", loginRoutes);

// Initialize WebSockets
setupWebSocket(server);

// Initialize RPC
setupRPC();

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: "Internal Server Error" });
});

// Start server on port 1001
server.listen(1001, () => console.log("Login Microservice running on port 1001"));
