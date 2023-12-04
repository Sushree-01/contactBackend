const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
  name:{type:String,required:true},
  email:{type:String,required:true},
  phone:{type:String,required:true},
  label:{type:String,required:true},
  booked_slots:{type:Array,default:[]},
});
const UserModel=mongoose.model('contacts',userSchema);

module.exports={UserModel};
