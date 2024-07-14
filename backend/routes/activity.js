
const express = require("express");
const router = express.Router()
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");


const COMPUTER = mongoose.model("COMPUTER");


router.post("/createComputer",requireLogin , (req , res) => {
    const { category , company , dateOfInstall , dateOfPurchase , serialNo } = req.body;
    // console.log(pic)
    if(!category || !company || !dateOfPurchase || !dateOfInstall || !serialNo ){
        return res.status(422).json({error : "Please add all the fields"})
    }
    // const Ukey = `${category}${dateOfInstall}${serialNo}` ;
    var Ukey = '' ;
    if(category==='Computer'){
        Ukey = `DPC${dateOfInstall}${serialNo}`;
    }
    if(category=='Scanner'){
        Ukey = `SCN${dateOfInstall}${serialNo}`;
    }
    if(category=='Printer'){
        Ukey = `PRN${dateOfInstall}${serialNo}`;
    }
    if(category=='UPS'){
        Ukey = `UPS${dateOfInstall}${serialNo}`;
    }


    COMPUTER.findOne({$or : [{UniqueKey : Ukey} , {serialNo : serialNo}]}).then
    ((srNo) => {
        if(srNo){
            return res.status(422).json({ error: "serialNo is already exists" })
        }
       


        // req.user
        const compter = new COMPUTER({
            category,
            company,
            dateOfInstall,
            dateOfPurchase,
            serialNo,
            UniqueKey : Ukey ,
            postedBy : req.user,
            Remark : "Yes"
        })
        compter.save().then((result)=>{
            return res.json({compter:result})
        }).catch(err => console.log(err))
    



    })

   
    // res.json("ok")
})


router.get("/allcomuters" ,requireLogin, (req , res)=> {
    COMPUTER.find()
    .populate("postedBy","_id category company dateOfPurchase dateOfInstall ")

    .then(computer => res.json(computer))
    .catch(err => console.log(err))
})


// router.get("/comuter/:id" , (req , res)=> {
//     COMPUTER.findById(req.params.id)
//     .populate("postedBy","_id category company dateOfPurchase dateOfInstall ")

//     .then(computer => res.json(computer))
//     .catch(err => console.log(err))
// })

// router.get("/computer/:UniqueKey", (req, res) => {
//     // COMPUTER.findById(req.params.id)
//     COMPUTER.find({UniqueKey: req.params.UniqueKey})
//         .populate("postedBy", "_id category company dateOfPurchase dateOfInstall")
//         .then(computer => {
//             if (!computer) {
//                 return res.status(404).json({ error: "Computer not found" });
//             }
//             res.json(computer);
//         })
//         .catch(err => {
//             console.error(err);
//             res.status(500).json({ error: "Server error" });
//         });
// });


router.get("/computer/:UniqueKey", (req, res) => {
    COMPUTER.findOne({ UniqueKey: req.params.UniqueKey })
        .populate("postedBy", "_id category company dateOfPurchase dateOfInstall")
        .then(computer => {
            if (!computer) {
                return res.status(404).json({ error: "Computer not found" });
            }
            res.json(computer);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Server error" });
        });
});












module.exports = router;