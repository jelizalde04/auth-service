const soap = require("soap");
const express = require("express");

const setupSOAP = (app) => {
    const service = {
        ResetPasswordService: {
            ResetPasswordPort: {
                resetPassword: async (args) => {
                    console.log("SOAP request received:", args);
                    return { message: `Password for ${args.email} reset successfully!` };
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
