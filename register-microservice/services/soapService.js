const soap = require("soap");
const express = require("express");

const setupSOAP = (app) => {
    const service = {
        RegisterService: {
            RegisterPort: {
                registerUser: async (args) => {
                    console.log("SOAP request received:", args);
                    return { message: `User ${args.email} registered successfully!` };
                },
            },
        },
    };

    const xml = require("fs").readFileSync("soap-definition.wsdl", "utf8");

    app.use("/soap", (req, res) => {
        soap.listen(req, res, { path: "/soap", services: service, xml });
    });

    console.log("SOAP service running at /soap");
};

module.exports = { setupSOAP };
