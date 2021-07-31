import {DEBUG_MODE} from '../config';
import { ValidationError } from 'joi';

const errorHandler = (err, req, res, next ) => {
    let statusCode = 500;
    let data = {
        message: 'internal server error',
        ...(DEBUG_MODE === 'true' && { originalError: err.message } ),
    }
    if(err instanceof ValidationError){
        statusCode = 422;
        data = {
            message: err.message
        }
    }
    return res.status(422).json(data);
}

export default errorHandler