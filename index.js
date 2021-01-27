
const express = require("express");
const Smooch = require("smooch-core");
const bodyParser = require("body-parser");
const ngrok = require("ngrok");
const fs = require("fs");
const config = require("./config.json");

const app = express();
const smooch = new Smooch({
    keyId: config.keyId,
    secret: config.secret,
    scope: "app",
});

app.use(bodyParser.json());

app.post("/messages", async (req, res) => {
    const text = JSON.stringify(req.body, null, 4);
    console.log("WEBHOOK EVENT: " + text);
    res.sendStatus(200);
    fs.appendFileSync("logs.json", text + "\n");
    res.end();
});

app.get("/", function (req, res) {
	res.sendStatus(200);
});

app.listen(process.env.port || config.port, function () {
    console.log(
        "listening on: " + (process.env.port || "localhost " + config.port)
    );
});

async function expose(port) {
    const url = await ngrok.connect({ addr: port, subdomain: config.domain });
    console.log('webhook target: ' + url + "/messages");
}
expose(config.port);
