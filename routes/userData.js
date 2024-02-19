var express = require('express');
var router = express.Router();
const{userData}=require('../controllers/author.controller')

/* GET home page. */
router.post("/create", userData);

module.exports = router;
