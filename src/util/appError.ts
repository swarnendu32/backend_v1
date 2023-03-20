class AppError extends Error {
    errorCode: number;
    statusCode: number;
    reason: string;
    constructor(
        erroCode: number,
        message: string,
        reason: string,
        statusCode: number
    ) {
        super(message);
        this.errorCode = erroCode;
        this.reason = reason;
        this.statusCode = statusCode;
    }
}

export default AppError;
