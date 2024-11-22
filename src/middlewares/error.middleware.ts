import * as dotenv from 'dotenv';
import { Logger } from "../utils";
// import { ArgumentValidationError, CustomError } from "../errors";

dotenv.config();

/**
 * returns a formatted error message
 * @param {Object} the error object
 * @param {Object} req the request object
 * @param {Object} res the response object
 * @param {Function} next next callback
 * @returns {JSON}
 *
 */
const errorMiddleware = (err, req, res, next) => {
  Logger.error(err);
  let status = err.status || 500;
  let message = () => {
    return status == 500 ? "There's a problem from our end. We are working to fix it." : err.message;
  }

  console.log("ERROR", err.message);
  res.header("Content-Type", "application/json");
  res.status(status).json({
      success: false,
      statusCode: status,
      message: message(),
  });
};

export { errorMiddleware };
