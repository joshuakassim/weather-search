// Handles undefined routes
const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Handle errors
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Check for mongoose "Cast Error"
  if (err.name === 'Cast Error' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found';
  }

  // Return JSON response with appropriate error message
  res.status(statusCode).json({
    message: message,
    stack: err.stack,
  });
};

export { notFound, errorHandler };
