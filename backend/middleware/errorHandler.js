const errorHandler = (err,req,res,next) => {
    
    const statusCode = res.statusCode === 200 ? 500 : statusCode;
    res.status(statusCode) ;
    res.json({
        status : err.statusCode,
        message : err.message
    })
}

module.exports = {errorHandler} ;