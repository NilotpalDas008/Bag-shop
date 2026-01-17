const mongoose =require('mongoose');
const config  = require('config');
const dbgr = require('debug')('developement:mongoose');

mongoose
.connect(config.get('MONGODB_URI'), { dbName: 'baggy-bcakend' })
.then(function(){
    dbgr('connected');
})
.catch(function(err){
    console.log(err);
})

module.exports = mongoose.connection ;