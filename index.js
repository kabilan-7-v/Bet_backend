const express = require('express');
const dotenv =  require("dotenv");
const {route} = require('./router/gold.router.js')
const { connect_db } = require('./Db/connectdb.js');
const bodyParser = require("body-parser");

const app = express();



dotenv.config();



// Middleware to parse JSON
app.use(bodyParser.json()); // or app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.json());
app.use("/api",route);

app.listen(process.env.PORT, () => {
    connect_db();
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});
