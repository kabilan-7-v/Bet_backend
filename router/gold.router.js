const express = require('express');
const { createGoldbet } = require('../controller/gold.controller.js');
const { addformData, getformdata } = require('../controller/formbet.controller.js');



const route = express.Router();
route.post('/goldbet',createGoldbet)

route.post('/addformdata',addformData)
route.get('/getformdata',getformdata)



module.exports = { route };
