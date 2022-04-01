const mongoose = require('mongoose');
const BookSchema =  new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,

  },
});

module.exports=mongoose.model("Book",BookSchema)
//--------------------------------------------
//this model is exported
//this export  will go to mongodb
//mongodb will create collection to the shema name
