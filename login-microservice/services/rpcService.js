const amqp = require("amqplib");

const setupRPC = async () => {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    const queue = "rpc_queue";

    await channel.assertQueue(queue, { durable: false });
    console.log("RPC server waiting for requests...");

    channel.consume(queue, async (msg) => {
        const request = JSON.parse(msg.content.toString());
        console.log("RPC request received:", request);

        const response = { success: true, message: `Hello, ${request.name}` };
        channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(response)), {
            correlationId: msg.properties.correlationId
        });

        channel.ack(msg);
    });
};

module.exports = { setupRPC };
