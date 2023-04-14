const User = require('../model/UserFlip');
const jwt = require('jsonwebtoken');
require("dotenv").config();
// console.log("process.env.JWT_SECRET");

exports.signup = (req,res)=>{
    User.findOne({email:req.body.email})
    .exec((error,user)=>{
       if(user)return res.status(400).json({
           message:'User already registered',
           user
       });
       
       const {
           firstName,
           lastName,
           email,
           password
       }= req.body;
       const _user = new User({
           firstName,
           lastName,
           email,
           password ,
           username: Math.random().toString()
       });
       _user.save((error,data)=>{
                if(error){
                   return res.status(400).json({ 
                       // message:'Something went wrongs'
                        _user
                   });
                }
                if(data){
                   return res.status(201).json({
                        message:'user created successfully...'
                   })
                }
       });
    });
}

//signin
exports.sigin =(req,res)=>{
User.findOne({email:req.body.email})
.exec((error,user)=>{
    if(error)return res.status(400).json({error})
    if(user){
if(user.authenticate(req.body.password)){
    const token = jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresin:'1h'});
    const {firstName,lastName,email,role,fullName}=user;
    res.status(200).json({
        token,
        user:{
            firstName,lastName,email,role,fullName
        }
    });
}else{
    return res.status(400).json({
        message:'Invaild password'
    })
}
    }else{
        return res.status(400).json({message:'something went wrong'})
    }
})

} 
