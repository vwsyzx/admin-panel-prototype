module.exports = class apiError extends Error{
    status;
    errors;

    constructor(status, message, errors = []){
        super(message)
        tis.status = status
        this.errors = errors
    }
    static Unauthorized(){
        return new apiError(401, 'User Unauthorized!')
    }
    static BadRequest(message, errors = []){
        return new apiError(400, message, errors)
    }
}