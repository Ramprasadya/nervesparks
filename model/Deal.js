const mongoose = require('mongoose')

const dealSchema = new mongoose.Schema({
    deal_id :{
        type:String,
        require:true
    },
  car_id:{
    type:String,
    require:true
  },
  deal_info:{
    type:String,
    require:true
  }
  });

  const Deal = mongoose.model('Deal', dealSchema);

  module.exports = Deal