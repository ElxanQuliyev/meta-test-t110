const db = require('../db');
var voucher_codes = require('voucher-code-generator');

const add=async(req,res)=>{
    try {
        const data=req.body
        const answer= voucher_codes.generate({
                    length: 6,
                    count: data.count,
                    charset: voucher_codes.charset("alphabetic"),
                    prefix: "PROMO-",
                    postfix: `-${data.Name}`
                })
                const date=new Date()
                answer.forEach(x=>{
                     db.collection('Promo').doc(x).set({
                        Discount:data.Discount,
                        Deadline:date.getDate()+data.Deadline,
                        Company:data.Name
                    })
                })
        res.send(answer)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const deletePromo=async(req,res)=>{

}

module.exports={
    add
}
