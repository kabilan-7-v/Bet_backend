const BetForm = require("../Models/bet_form.model.js"); 

exports.addformData = async (req, res, next) => {
    const { Image, touch, bet_stopdate, bet_stoptime, order_enddate, order_endtime, interception, description, category } = req.body;

    if (!Image || !touch || !bet_stopdate || !bet_stoptime || !order_enddate || !order_endtime || !interception || !description || !category) {
        res.status(400).json({ message: "Please fill in all fields" });
    }

    try {
        const newImage = await BetForm.create({ Image, touch, bet_stopdate, bet_stoptime, order_enddate, order_endtime, interception, description, category });
        res.status(201).json({ message: "Data Added Successfully", data: newImage });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};



exports.getformdata = async (req,res,next) =>{
    try {
        const formData = await BetForm.find(); 
        res.status(200).json({ message: "Data Retrieved Successfully", data: formData });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}