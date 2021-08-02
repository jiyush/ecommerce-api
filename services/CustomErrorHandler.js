class CustomErrorHandle extends Error {
    constructor(status, message){
        super();
        this.status = status;
        this.message = message;
    }

    static emailAlreadyExist(message){
        return new CustomErrorHandle(409, message);
    }

    static doesNotExist(message){
        return new CustomErrorHandle(401, message);
    }

    static notFound(message = 'user not found'){
        return new CustomErrorHandle(404, message)
    }

    static unAuthorized(message = 'unAuthorized'){
        return new CustomErrorHandle(404, message)
    }

    
}

export default CustomErrorHandle;