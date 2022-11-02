
const ShortUrl = require('../../lib/models/shortUrl.model');
const { nanoid } = require('nanoid');
class UrlController {
    async createShortUrl(req, res) {
        const { origUrl } = req.body;
        //Base Url for short url prefix
        const base = process.env.BASE;

        // genrate unique 11 bytes id using algo base62  A-Z, a-z, 0–9 total( 26 + 26 + 10 = 62)
        // so 62^11  combinations we have 
        const urlId = nanoid(11);
        //Fetch configurable expiry hours and convert into minutes 
        let expiryMinutes = parseInt(process.env.URL_EXPIRY_HOURS) * 60
        let d1 = new Date(),
            d2 = new Date(d1);
        // Add expiry hours in current date time for document expire     
        d2.setMinutes(d1.getMinutes() + expiryMinutes);

        try {
            let url = await ShortUrl.findOne({ origUrl });
            if (url) {
                return res.success({
                    origUrl: url.origUrl,
                    shortUrl: url.shortUrl,
                    expireAt: url.expireAt.toISOString()
                }, 'data success');
            } else {
                const shortUrl = `${base}${urlId}`;
                url = new ShortUrl({
                    origUrl,
                    shortUrl,
                    urlId,
                    expireAt: d2,
                });

                await url.save();
                return res.success({
                    origUrl: url.origUrl,
                    shortUrl: url.shortUrl,
                    expireAt: url.expireAt.toISOString()
                }, 'data success');
            }

        } catch (e) {
            console.log("Error : ", e);
            return res.serverError({}, e.message);
        }
    }
    async getShortUrl(req, res) {
        const { origUrl } = req.params
        try {
            const url = await ShortUrl.findOne({ origUrl });
            if (!url) {
                return res.notFound({}, 'url is expired or not found');
            }
            return res.success({
                origUrl: url.origUrl,
                shortUrl: url.shortUrl,
                expireAt: url.expireAt.toISOString()
            }, 'url found');
        } catch (e) {
            console.log("Error : ", e.message);
            return res.serverError({}, e.message);
        }
    }
    async getLongUrl(req, res) {
        const { urlId } = req.params
        try {
            const url = await ShortUrl.findOne({ urlId });
            if (!url) {
                return res.notFound({}, 'url is expired or not found');
            }
            return res.success({
                origUrl: url.origUrl,
                shortUrl: url.shortUrl,
                expireAt: url.expireAt.toISOString()
            }, 'url found');
        } catch (e) {
            console.log("Error : ", e.message);
            return res.serverError({}, e.message);
        }
    }
}
module.exports = new UrlController();