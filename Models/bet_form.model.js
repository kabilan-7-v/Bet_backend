const mongoose = require("mongoose");

const BetFormSchema = new mongoose.Schema({
    Image: String,
    touch: String,
    bet_stopdate: String,
    bet_stoptime: String,
    order_enddate: String,
    order_endtime: String,
    interception: String,
    description: String,
    category: String,
    roomID:String,
});

module.exports = mongoose.model("BetForm", BetFormSchema);
