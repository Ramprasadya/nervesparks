const mongoose = require('mongoose')

const UserFirst = new mongoose.Schema({
    username:{
        type:String,
        require : true
    },
    password:{
        type:String,
        require:true
    }
})

const user = mongoose.model('user',UserFirst)

module.exports = user