const WebSocket = require("ws");

const setupWebSocket = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on("connection", (ws) => {
        console.log("Client connected via WebSocket");

        ws.on("message", (message) => {
            console.log(`Received message: ${message}`);
            ws.send(`Echo: ${message}`);
        });
    });
};

module.exports = { setupWebSocket };
