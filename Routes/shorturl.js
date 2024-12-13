const express = require('express');
const URL = require('../Models/URL.js');
const { handleGetAnalytics } = require('../Controllers/URL'); // Ensure correct import
const shortid = require('shortid');

const router = express.Router();

router.get(("/"), (req, res) => {

    return res.render("home", {

    })
})
router.get("/count/:shortId", handleGetAnalytics);



module.exports = router;
