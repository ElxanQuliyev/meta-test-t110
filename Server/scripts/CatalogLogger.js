const winston=require('winston')

const logger=winston.createLogger({
    format:winston.format.json(),
    transports:[
        new winston.transports.File({filename:'logs/projects/error.log',level:'error'}),
        new winston.transports.Console()
    ]
})

module.exports=logger