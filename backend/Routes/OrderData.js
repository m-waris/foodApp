const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/orderdata', async (req, res) => {
    let data = req.body.order_data;
    await data.splice(0, 0, { order_date: req.body.order_date });
    let eId = await Order.findOne({ 'email': req.body.email });

    if (eId === null) {
        try {
            Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                res.json({ success: true });
            })

            res.send("Order Placed");
        }
        catch (error) {
            console.log(error);
        }
    }
    else {
        try {
            await Order.findOneAndUpdate({ email: req.body.email },
                { $push: { order_data: data } }).then(() => {
                    res.json({ success: true });
                })
        }
        catch (error) {
            console.log(error);
        }
    }

})

router.post('/myOrderData', async (req, res) => {
    try {
        console.log(req.body.email)
        let eId = await Order.findOne({ 'email': req.body.email })
        //console.log(eId)
        res.json({orderData:eId})
    } catch (error) {
        res.send("Error",error.message)
    }
    

});



module.exports = router;