const logger=require('../scripts/CatalogLogger')
const date=new Date()

class BaseError extends Error {
    constructor(httpCode, description, isOperational) {
      super(description);
      Object.setPrototypeOf(this, new.target.prototype);
      this.status = httpCode;
      Error.captureStackTrace(this,BaseError);

      logger.log({
        level:'error',
        message:description,
        service:isOperational,
        date:date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear()+'/'+date.getHours()+':'+date.getMinutes()
    })
    }
   }
   module.exports=BaseError