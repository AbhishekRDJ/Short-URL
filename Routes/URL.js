const express = require('express');
const { handelGenerteNewShortURL,handleGetAnalytics } = require('../Controllers/URL'); // Ensure correct import

const router = express.Router();


router.post("/", handelGenerteNewShortURL);
router.get("/count/:shortId", handleGetAnalytics);

module.exports = router;
