const BaseError = require('./baseError')
const httpStatus = require('http-status');


const internalerror=async(req,res,next)=>{
    const error=new BaseError(httpStatus.NOT_FOUND,'Not Found','api404')
    next(error)
}

const resError=async(error,req,res,next)=>{
    res.status(error.status || 500);
    // res.removeHeader();
    res.removeHeader('X-Powered-By');
    // res.removeHeader('Access-Control-Allow-Origin');
    res.removeHeader('Content-Security-Policy');
    res.removeHeader('X-Content-Type-Options');
    res.removeHeader('Expect-CT');
    
     res.json({status:error.status,message:error.message})

}

module.exports = {internalerror,resError}