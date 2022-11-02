const mongoose = require('mongoose')

const shortUrlSchema = new mongoose.Schema({
  urlId: {
    type: String,
    required: true,
  },
  origUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  expireAt: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: String,
    default: Date.now,
  }
})
shortUrlSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });
module.exports = mongoose.model('ShortUrl', shortUrlSchema)