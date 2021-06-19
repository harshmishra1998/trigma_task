const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
global.appRoot = path.resolve(__dirname);
global._pathconst = require("../api/helper/constant/pathconst");
global.api_message = require("../api/helper/constant/messages").URLS;


const config = require('../config/');
const dbService = require('./services/db.service');
const environment = process.env.NODE_ENV || 'development';
const app = express();
const DB = dbService(environment, config.migrate).start();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

require(_pathconst.FilesPath.routes)(app);

app.get('/', (req, res) => {
    return res.send("ok");
})
app.listen(config.port, () => {
    if (environment !== 'development') {
        console.error(`NODE_ENV is set to ${environment}, but only production and development are valid.`);
        process.exit(1);
    }
    console.log(`We are in!`);
    return DB;
});