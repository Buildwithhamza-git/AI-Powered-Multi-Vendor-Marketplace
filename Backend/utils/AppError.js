class AppError extends Error {
    constructor(message, field = null, statusCode = 400) {
        super(message);
        this.field = field;
        this.statusCode = statusCode;
    }
}

module.exports = AppError;