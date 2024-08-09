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
  try {
    const text = JSON.stringify(req.body, null, 4);
    console.log("WEBHOOK EVENT: " + text);
    fs.appendFileSync("logs.json", text + "\n");
    res.sendStatus(200);
  } catch (err) {
    console.error("Error handling /messages request:", err);
    res.sendStatus(500);
  }
});

app.get("/", (req, res) => {
  res.sendStatus(200);
});

const port = process.env.PORT || config.port;

app.listen(port, () => {
  console.log(`listening on: ${port}`);
  expose(port).catch((err) => console.error("Unhandled error in expose:", err));
});

async function expose(port) {
  try {
    const url = await ngrok.connect({ addr: port, subdomain: config.domain });
    console.log(`webhook target: ${url}/messages`);
  } catch (err) {
    console.error("Error setting up ngrok:", err);
  }
}
