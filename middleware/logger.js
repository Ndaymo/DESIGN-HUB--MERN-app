const {format} = require ('date-fns')
const {v4: uuid} = require ('uuid')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path') 


const logEvents= async (message, logFileName)=>{

    const dateTime= `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
const logItem= `${dateTime}\t${uuid()}\t${message}\n`
try {
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))){
      await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))  
    }
    await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem)
} catch (err){
    console.log(err)
}
}
const logger = (req,res, next)=>{
    const startTime = new Date();
    res.on('finish', () => {
        const endTime = new Date();
        const responseTime = endTime - startTime;
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'req.Log.log');
});
    console.log(`${req.method} ${req.path}`)
    next()
}

module.exports= {logEvents, logger}