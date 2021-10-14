const WebSocket = require('ws');
const puppeteer = require('puppeteer');
const express = require('express');
const cors = require('cors');

const Database = require('./Database');

const app = express();

require('dotenv').config();

const port = process.env.SECRET_CHARTS_SERVER_PORT;
const viewPortHeight = 1920;
const viewPortWidth = 1080;
let websocketClient;
let database;

// Get this working inside a container with args
const puppeteerLaunchArgs = [
  '--disable-gpu',
  '--disable-dev-shm-usage',
  '--disable-setuid-sandbox',
  '--no-sandbox',
  `-window-size=${viewPortHeight},${viewPortWidth}`,
];

(async () => {
  try {
    websocketClient = new WebSocket(
      `ws://${process.env.WEBSOCKET_URL}:${process.env.WEBSOCKET_PORT}`
    );

    database = new Database();
    database.connect();
  } catch (err) {
    console.log('Error occured...');
    console.log(err);
  }
})();

(async () => {
  try {
    const browser = await puppeteer.launch({
      args: puppeteerLaunchArgs,
      defaultViewport: null,
    });

    const page = await browser.newPage();

    websocketClient.on('message', (message) => {
      const messageObject = JSON.parse(message);
      const symbol = messageObject.symbol;
      const channel = messageObject.channel;

      page
        .goto(`http://localhost:${process.env.PORT}/?${symbol}`, {
          waitUntil: 'networkidle2',
        })
        .then(() => {
          const fileName = `${symbol}_${Date.now()}.png`;
          const screenshot = `${process.env.SECRET_CHARTS_IMAGE_LOCATION}${fileName}`;

          page
            .screenshot({
              path: screenshot,
              fullPage: true,
            })
            .then(() => {
              const imageMessage = JSON.stringify({
                messageType: 'IMAGE',
                symbol: symbol,
                imageLocation: screenshot,
                fileName: fileName,
                channel: channel,
              });
              try {
                websocketClient.send(imageMessage);
              } catch (err) {
                console.log('Error occured...');
                console.log(err);
              }
            });
        });
    });
  } catch (err) {
    console.log('Error occured...');
    console.log(err);
  }
})();

app.use(cors());
app.use(express.json());

app.get('/flow/:symbol', (req, res) => {
  database.read(req.params.symbol).then((result) => {
    res.json(result);
  });
});

app.listen(port, (err) => {
  if (err) {
    console.log('Something went wrong', err);
  } else {
    console.log('Server is listening on port ' + port);
  }
});
