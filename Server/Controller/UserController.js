'use strict'
// require('dotenv').config();
const firestore = require('../db');
const User = require('../models/User');
const Validator=require('validatorjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../config');
const Autherize=require('../middlewares/Auth');
const transporter=require('../config').transporter;
var voucher_codes = require('voucher-code-generator');
const BaseError=require('../errorhandle/baseError')
const httpstatus=require('http-status')
const {query,doc, addDoc,collection,getDoc, getDocs,where, updateDoc  }=require('firebase/firestore');
const axios =require('axios')
var rand,mailOptions,host,link,useremail;

const addUser = async (req, res, next) => {
    try {
        const data = req.body;
        const contents=query(collection(firestore, 'User'),where('email','==',data.email));
        const user= await getDocs(contents)
        user.forEach(x=>{
            if(x.data().email==data.email) {
             throw res.send('Bu emailde istifadeci var')
            }
        })

        const lets=new Validator(
        {
            email:data.email,
            phonenumber:data.phonenumber,
            password:data.password,
            repeatPassword:data.repeatPassword,
            name:data.name,
            surname:data.surname,
        },
        {
            email:'required|email',
            phonenumber:'required|string',
            password:'required|string',
            repeatPassword:'required|string',
            name:'required|string',
            surname:'required|string'
        }
        )
        lets.fails(()=>{
            throw res.send(lets.errors)
        })

        if (data.password==data.repeatPassword){
            const hash = crypto.createHash('sha256').update(data.password).digest('base64');

            var docRef = await addDoc(collection(firestore, "User"),{
                email:data.email,
                phonenumber:data.phonenumber,
                password:hash,
                name:data.name,
                surname:data.surname,
                is_active:false,
                register_date: new Date(),
                claims:["Free"],
                confirm_email:false,
              });
            }else{
                throw res.send('Password ve repeat password uygun deyil')
            }
            var token = jwt.sign({ id: docRef._key.path.segments[1],role: ["Free"] }, config.secret, {
                expiresIn: 86400*30 // expires in 30 day
              });

                host=req.get('host');
                link="http://"+req.get('host')+`/api/user/${docRef._key.path.segments[1]}/verify?id=${token}`;
                mailOptions={
                    from:"metaflix1234@gmail.com",
                    to : data.Email,
                    subject : "Please confirm your Email account",
                    html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>" 
                }
                let mail=true
                 transporter.sendMail(mailOptions,(err,code)=>
                {
                    if (err){throw res.status(400).send(err)}
                    if(code){ mail=false}
                });
                //  axios.get(`http://api.msm.az/sendsms?user=msmtest&password=bUWmaTTH&gsm=994${data.Phonenumber}&from=MSM&text=sizin testdiq kodunuz 555`)
                //  .then(response=>{
                //  console.log(response)
                //  }),
                useremail=data.email
         res.send({message:'Gmail hesabinizi tesdiq edin',host:host,mail:mail})
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const verifyuser=async(req,res)=>{
    try {
        const id=req.query.id
        const email=req.params.email
        let user=await Autherize.authen(id)
        if((req.protocol+"://"+req.get('host'))==("http://"+host)){
         console.log("Domain is matched. Information is from Authentic email");

         if (user==null) {
             throw res.send('tesdiqlenmedi')
         }
              await updateDoc(doc(firestore,'User',user.id),{
                  ConfirmEmail:true,
                });
              res.end("<h1>Email "+user.Email+" is been Successfully verified");
}
else
{
    res.end("<h1>Request is from unknown source");
}
    } catch (error) {
       throw res.send(error.message)
    }
}

const login = async(req, res, next) =>{
    try {
        const email = req.body.email;
        const password=crypto.createHash('sha256').update(req.body.password).digest('base64')
        const contents=query(collection(firestore, 'User'),where('email','==',email));
        const user= await getDocs(contents)
        let User;
        user.forEach(x=>{
            if (x.data().email==email) {
                User=x;
            }
        })
        if (User==null) {
           throw new Error('Istifadeci tapilmadi')
        }

        if (User.data().email != email) {
           throw new Error('email yalnisdir')
        }
        else if(User.data().password != password){
           throw new Error('Sifre yalnisdir')
        }

        if (User.data().confirm_email!=true) {
            throw new Error({message:'Email tesdiq edilmeyib',status:400})
        }

        var token = jwt.sign({ id: User.id,role: User.data().Claims }, config.secret, {
            expiresIn: 86400*30 // expires in 30 day
          });
        res.status(200).send(
            {token:token,
                is_admin:User.data().is_admin,
                name:User.data().name,
                surname:User.data().sur_name,
                pictureUrl:User.data().pictureUrl,
                email:User.data().email,
                status:200}
            )
    } catch (error) {
     next(new BaseError(httpstatus.UNAUTHORIZED,error.message,'UserController/login'))
    }
}

const getuser=async(req,res,next)=>{
    try {
        const token=req.headers['x-access-token'];
         let user=await Autherize.authen(token)

        if (user==null) {
           throw new Error('Siz qeydiyyatdan kecmemisiz')
        }
        res.send(user)
    } catch (error) {
        next(new BaseError(httpstatus.UNAUTHORIZED,error.message,'UserController/login'))
    }
}

const getAllUser = async (req, res, next) => {
    try {
        const users = collection(firestore,'User');
        const data = await getDocs(users);
        const usersArray = [];
        if (data.empty) {
            res.status(404).send('Istifadeci tapilmadi')
        } else {
            data.forEach(doc => {
                const user ={
                   id: doc.id,
                   email: doc.data().email,
                   name:doc.data().name,
                   pictureUrl:User.data().pictureUrl,
                   is_admin:doc.data().is_admin
                };
                usersArray.push(user);
            })
            res.send(usersArray)
        }
    } catch (error) {
        next(new BaseError(httpstatus.UNAUTHORIZED,error.message,'UserController/login'))
    }
}

module.exports = {
    addUser,
    getAllUser,
    login,
    getuser,
    verifyuser
}