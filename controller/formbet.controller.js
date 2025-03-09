const BetForm = require("../Models/bet_form.model.js"); 


exports.getformdata = async (req,res,next) =>{
    try {
        const formData = await BetForm.find(); 
        res.status(200).json({ message: "Data Retrieved Successfully", data: formData });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

exports.updatetouchdata = async (req,res)=>{
    try {

        const {touch,roomID} = req.body;
        if(!touch || !roomID){
            return res.status(400).json({ message: "Please provide all required fields" });
        }
        else{
            await  BetForm.updateOne(
                 {
                  roomID:roomID
                 },
                 {
                  $set: {touch:touch}
                 }
      
              )
            return res.status(200).json({ message: "Data Updated Successfully" });
        }
    }
    catch (e) {
        return res.status(500).json({ message: e.message });
    }
}