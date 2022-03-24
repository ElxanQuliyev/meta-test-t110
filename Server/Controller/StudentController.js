'use strict'
const { addDoc, collection, getDoc, doc } = require('firebase/firestore');
const db =require('../db');

const addstudent=async(req,res)=>{
   try {
    const data=req.body
    const name=data.Name
    const email=data.Email
    const password=data.Password
    await addDoc(collection(db,'Student'),data)
    res.send('Student elave olundu')
   } catch (error) {
       res.status(400).send(error.message)
   }
}

const getstudent=async (req,res)=>{
try {

    const data=await getDoc(doc(db,'Student','uYnpa8P8PskQzIqBYViq'))
    res.send(data.data())
} catch (error) {
    res.status(400).send(error.message)
}
}

module.exports={
    addstudent,
    getstudent
}