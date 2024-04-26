const express = require('express');
const router = express.Router();
const { getQueries } = require('../controllers/controller_queries');

router.get('/', getQueries);

module.exports = router;
