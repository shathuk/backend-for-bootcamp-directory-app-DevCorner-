const ErrorRespose = require('../utils/errorRespose');

const errorHandler = (err, req, res, next) => {
    let error = { ...err }
    //log to console for dev
    console.log(err);

    //moongose bad objectID
    if(err.name === 'CastError') {
        const message = `Resource not found with given id of ${err.value}`;
        error = new ErrorRespose(message, 404);
    }

    //mongoose duplicate key
    if(err.code === 11000) {
        const message = 'Duplicate field value entered';
        error = new ErrorRespose(message, 400)
    }

    //mongoose validation error
    if(err.name === 'ValidationError') {
        const message = Object.values(err.errors).map( val => val.message);
        error: new ErrorRespose(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    });
    
}

module.exports = errorHandler;