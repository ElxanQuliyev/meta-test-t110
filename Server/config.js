'use strict'
const dotenv=require('dotenv')
const assert=require('assert')
const nodemailer = require("nodemailer");

dotenv.config()
const{
    PORT,
    HOST,
    HOST_URL,
    MailUser,
    MailPassword,
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId
}=process.env

const firebaseConfig = {
  apiKey:apiKey,
  authDomain:authDomain,
  projectId: projectId,
  storageBucket:storageBucket,
  messagingSenderId: messagingSenderId,
  appId:appId,
  measurementId: measurementId
};

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: MailUser,
      pass: MailPassword
    }
  })



assert(PORT,"Port is required")
assert(HOST,"Host is required")

module.exports={
    port:PORT,
    host:HOST,
    url:HOST_URL,
    'secret': 'supersecret',
    transporter,
    firebaseConfig
}
