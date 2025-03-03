const mongoose = require("mongoose");



exports.connect_db = async ()=>{
   await mongoose.connect(process.env.Mongodb_url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
   )

   console.log("database connected")


}