const express = require('express');
const { createGoldbet } = require('../controller/gold.controller.js');
const { addformData, getformdata, updatetouchdata } = require('../controller/formbet.controller.js');



const route = express.Router();
route.post('/goldbet',createGoldbet)

route.get('/getformdata',getformdata)

route.post('/updatetouch',updatetouchdata)



module.exports = { route };
