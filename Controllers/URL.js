const shortid = require("shortid");
const URL = require('../Models/URL.js');

async function handelGenerteNewShortURL(req, res) {
    try {
        const shortID = shortid.generate(); // Generate short ID
        const body = req.body;

        // Validate request body
        if (!body.url) {
            return res.status(400).json({ error: 'URL is required' });
        }

        // Optional: Validate the URL format
        const urlPattern = /^(http|https):\/\/[a-zA-Z0-9-_.]+(\.[a-zA-Z]{2,})+/;
        if (!urlPattern.test(body.url)) {
            return res.status(400).json({ error: 'Invalid URL format' });
        }

        // Check if the shortId already exists in the database
        const existingUrl = await URL.findOne({ shortId: shortID });
        if (existingUrl) {
            return res.status(400).json({ error: 'Short URL already exists' });
        }

        // Create a new URL entry in the database
        const newUrl = await URL.create({
            shortId: shortID,
            redirectURL: body.url,
            visitedHistory: []
        });

        // Respond with the created short URL
        return res.render("home", {
            id: shortID,
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

    // Get the total click count (or visits history length)
    const totalclick = result.visitedHistory.length;

    // Render the home page and pass totalclick to EJS
    return res.render("home", {
        totalclick: totalclick, 
        id: shortId // You may want to send the id too
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
