const mongoose = require("mongoose");

async function connectToMongo(url) {
    return mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }); 
}

module.exports = {
    connectToMongo, 
};
