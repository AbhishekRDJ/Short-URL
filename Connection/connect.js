const mongoose = require("mongoose");

async function connectToMongo(uri) {
    return mongoose.connect(uri)
}

module.exports = {
    connectToMongo,
};
