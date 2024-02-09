const express = require('express');
const router = express.Router();

router.get('/displaydata', async (req, res) => {
    try{
        res.send([global.allFoodItems, global.allFoodCategories]);
    }
    catch(error){
        console.log(error);
    }
});

module.exports = router;