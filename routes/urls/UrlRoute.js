const express = require('express');
const router = express.Router();
const UrlController = require('./UrlController');
// const { validateUrl } = require('../../lib/util');
console.log("enter here 555");

router.post('/create-short-url',  UrlController.createShortUrl );
router.get('/get-short-url/:origUrl', UrlController.getShortUrl );
router.post('/get-long-url/:urlId', UrlController.getLongUrl );


module.exports = router;