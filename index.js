const express = require("express")
require('dotenv').config(); 
const shorturl = require("./Routes/shorturl")
const urlRoute = require("./Routes/URL")
const { connectToMongo } = require("./Connection/connect")
const path = require("path")
const URL = require("./Models/URL")
const app = express()
const port = 8001;



const mongoURI = "mongodb+srv://abhisheksangule6:3v35GLNLtpovw4DV@urlshortener.5uo5s.mongodb.net/short_url?retryWrites=true&w=majority&appName=URLShortener";
// const mongoURI = process.env.MONGO_URI;
// console.log(process.env.MONGO_URI);

// console.log("Mongo URI:", process.env.MONGO_URI);

if (!mongoURI) {
    console.error("MONGO_URI is not defined. Please check your .env file.");
    process.exit(1); 
  }
connectToMongo(mongoURI).then(() => {
    console.log("MongoDB Has been Connected")
})


app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'));


// Home route
app.use("/", shorturl);

// Short URL routes
app.use('/url', urlRoute);

// Handle redirection for short URLs
app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;

    try {
        const entry = await URL.findOneAndUpdate(
            { shortId },
            { $push: { visitedHistory: { timestamp: Date.now() } } }
        );

        if (!entry) {
            console.log("Entry not found for shortId:", shortId);
            return res.status(404).json({ error: "Short URL not found" });
        }

        
        res.redirect(entry.redirectURL);
    } catch (error) {
        console.error("Error fetching short URL:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(port, () => {
    console.log(`server Started at port ${port}.....`)
})