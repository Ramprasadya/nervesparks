const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    car_id:{
        type:String,
        require : true,
        unique:true
    },
    type:{
        type:String,
        require:true
    },
    name:{
        type:String, 
        require:true
    },
    model:{
        type:String,
        require:true
    },car_info:{
        type: String ,
        require:true
    }
  });
  
  const Car = mongoose.model('Car', carSchema);

  module.exports = Car
