const mongoose = require("mongoose");

async function connectToMongo(url) {
    return mongoose.connect('mongodb+srv://abhisheksangule6:3v35GLNLtpovw4DV@urlshortener.5uo5s.mongodb.net/short_url?retryWrites=true&w=majority&appName=URLShortener', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        ssl: true,
      })
}

module.exports = {
    connectToMongo, 
};
