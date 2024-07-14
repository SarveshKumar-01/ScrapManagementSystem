const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types

const computerSchema = new mongoose.Schema({
    category:{
        type : String,
        // require : true,
        default : "Computer"
    },

    company :{
        type : String,
        require : true
    },
    serialNo :{
        type : String,
        require : true
    },
    UniqueKey :{
        type : String,
        require : true
    },
    dateOfPurchase :{
        type : String,
        require : true
    },
    dateOfInstall :{
        type : String,
        require : true
    },
    Remark :{
        type : String,
        require : true
    },
    postedBy:{
        type : ObjectId,
        ref : "USER"
    },
})

mongoose.model("COMPUTER" , computerSchema);