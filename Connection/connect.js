const mongoose = require("mongoose");

async function connectToMongo(url) {
    return mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true,ssl: true,sslValidate: false, // Disable validation if needed (use with caution)
        tlsCAFile: '/path/to/ca.pem'}); 
}

module.exports = {
    connectToMongo, 
};
