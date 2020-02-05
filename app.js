const express = require("express");
const bodyParser = require("body-parser");
const db = require('./src/database')
var app = express();
const router = require('./src/routes')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', router);
db.connect().then(db=> {
    app.listen(3000, () => {
        console.log("Listening at :3000...");
    });
}).catch(error => {
    console.log(error)
});
