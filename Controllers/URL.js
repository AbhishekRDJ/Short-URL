const shortid = require("shortid");
const URL = require('../Models/URL.js');

async function handelGenerteNewShortURL(req, res) {
    try {
        const shortID = shortid.generate(); 
        const body = req.body;

        
        if (!body.url) {
            return res.status(400).json({ error: 'URL is required' });
        }

        
        const urlPattern = /^(http|https):\/\/[a-zA-Z0-9-_.]+(\.[a-zA-Z]{2,})+/;
        if (!urlPattern.test(body.url)) {
            return res.status(400).json({ error: 'Invalid URL format' });
        }

        
        const existingUrl = await URL.findOne({ shortId: shortID });
        if (existingUrl) {
            return res.status(400).json({ error: 'Short URL already exists' });
        }

        
        const newUrl = await URL.create({
            shortId: shortID,
            redirectURL: body.url,
            visitedHistory: []
        });
        await newUrl.save();
        
        return res.render("home", {
            id: shortID,
            redirectURL: req.body.url,
            baseUrl: "https://short-url-m9x0.onrender.com"
        })
        return res.status(201).json({ shortId: newUrl.shortId, redirectURL: newUrl.redirectURL });
    } catch (err) {
        console.error("Error generating short URL:", err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });

    if (!result) {
        return res.status(404).send("Short URL not found.");
    }

   
    const totalclick = result.visitedHistory.length-1;

    return res.render("home", {
        totalclick: totalclick,
        id: shortId 
    });

    // return res.json({
    //     totalclick: result.visitedHistory.length,
    //     // analytics: result.visitedHistory
    // })

}

module.exports = {
    handelGenerteNewShortURL,
    handleGetAnalytics
};
