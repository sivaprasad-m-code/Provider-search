const mongoose=require('mongoose')
 const schema =new mongoose.Schema
 ({
    name:{type:String},
    address:{type:String,required: true},
    therapyType:{
      type:String,
      enum: ['In-Clinic', 'In-Home', 'Virtual'],
      required:true
   },
   contactNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    ratings: {
      type: Number,
      min: 0,
      max: 5,
    },
    services: {
      type: [String]
    }
  });
   

 module.exports=new mongoose.model("provider",schema)