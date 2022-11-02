
const urlExist = require('url-exists-nodejs');
// Middleware to validate url
const validateURL = async (req, res, next) => {
  const { origUrl } = req.body;
  const isExist = await urlExist(origUrl);
  if (!isExist) {
    return res.badRequest({}, "Invalid URL");
  }
  next();
};

const urlLength = async (req, res, next) => {
  const { origUrl } = req.body;
  const urlLength =  unescape( // convert a single `%xx` escape into the corresponding character
    encodeURI(origUrl) // URL-encode the string (this uses UTF-8)
  ).length; // read out the length (i.e. the number of `%xx` escapes)

  if(urlLength > 2048){
    return res.badRequest({}, "Url is not more than 2KB");
  }
  next();
}
module.exports = {
  validateURL,
  urlLength
}