const mongoose = require('mongoose') ;


const userSchema= mongoose.Schema({
    fullname: {
        type: String,
        minlenth: 3,
        trim : true,
    },
    email: String ,
    password: String ,
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product',
        },
    ],
    orders:{
        type: Array,
        default :[]
    },
    conatact : Number ,
    picture : String,
}) ;
module.exports =mongoose.model('user',userSchema);


