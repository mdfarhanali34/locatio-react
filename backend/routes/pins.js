const router = require('express').Router();
const pin = require('../models/pins');

//create a pin

router.post("/", async (req,res) => {

    const newPin = new pin(req.body);
    const saved = await newPin.save();
    res.status(200).json(saved);

})

//get all pin

router.get("/", async (req,res) => {

    const newPin = await pin.find();
    
    res.status(200).json(newPin);

})

module.exports = router