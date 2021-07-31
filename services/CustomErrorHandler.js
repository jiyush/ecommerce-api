class CustomErrorHandle {
    constructor(status, message){
        this.status = status;
        this.message = message;
    }

    static emailAlreadyExist(message){
        return new CustomErrorHandle(409, message);
    }
}

export default CustomErrorHandle;