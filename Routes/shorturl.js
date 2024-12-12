const express = require('express');
const {handleGetAnalytics } = require('../Controllers/URL'); // Ensure correct import

const router = express.Router();

router.get(("/"),(req,res)=>{
    
    return res.render("home",{

    })
})
router.get("/count/:shortId", handleGetAnalytics);


module.exports = router;
