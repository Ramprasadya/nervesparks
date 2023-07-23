const mongoose = require('mongoose');

// Connect to MongoDB
const ConnectToMongo =()=>{ mongoose.connect('mongodb://localhost:27017/car_dealership', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
    console.log("Connection Complete")
})};

module.exports = ConnectToMongo