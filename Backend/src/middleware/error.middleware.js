import Sentry from "../config/sentry.js";

export const errorMiddleware = (err, req, res, next) => {
  
  // Send error to Sentry
  Sentry.captureException(err);

  let statusCode = err.statusCode || 500;

  let message = err.message || "Internal Server Error";

  // ================= MONGOOSE BAD OBJECT ID =================

  if (err.name === "CastError") {
    statusCode = 400;

    message = "Invalid resource ID";
  }

  // ================= DUPLICATE KEY ERROR =================

  if (err.code === 11000) {
    statusCode = 400;

    const field = Object.keys(err.keyValue)[0];

    message = `${field} already exists`;
  }

  // ================= JWT ERRORS =================

  if (err.name === "JsonWebTokenError") {
    statusCode = 401;

    message = "Invalid token";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;

    message = "Token expired";
  }

  // ================= RESPONSE =================

  return res.status(statusCode).json({
    success: false,

    message,

    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
    }),
  });
};
