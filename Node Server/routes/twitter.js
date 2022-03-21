var express = require('express');
var tweetController = require('../controllers/tweet');
var router = express.Router();
router.get('/', tweetController.getTweets);
router.post('/', tweetController.createTweet);
router.delete('/:indexToDelete', tweetController.deleteTweet);
router.post('/deleteall', tweetController.deleteAll);
module.exports = router;
