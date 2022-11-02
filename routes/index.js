const express = require('express');
const router = express.Router();
const UrlController = require('./urls/UrlController');
const {validateURL, urlLength} = require('../lib/util')


router.post('/create-short-url', urlLength,  UrlController.createShortUrl );
router.get('/get-short-url/:origUrl', UrlController.getShortUrl );
router.get('/get-long-url/:urlId', UrlController.getLongUrl );

module.exports = router;
