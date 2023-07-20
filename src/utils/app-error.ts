import { ErrorCode } from "../types/error-codes";
import { StatusCode } from "../types/status-codes";

export class AppError extends Error {
  status: StatusCode;
  code: ErrorCode;
  constructor(message: string, status: StatusCode, code: ErrorCode) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

export default AppError;
