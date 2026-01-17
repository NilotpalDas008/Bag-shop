const mongoose = require('mongoose') ;


const ownerSchema= mongoose.Schema({
   fullname: {
        type: String,
        minlenth: 3,
        trim : true,
    },
    email: String ,
    password: String ,
    Products:{
        type: Array,
        default :[]
    },
    conatact : Number ,
    picture : String,
    gstin: String,
}) ;

module.exports =mongoose.model('owner',ownerSchema);