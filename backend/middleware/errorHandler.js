export const errorHandler = (err, req, res, next) => {
  // Set status code
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  // Log error in development
  if (process.env.NODE_ENV === 'development') {
    console.error('❌ Error:', err.message);
    console.error('Stack:', err.stack);
  }

  // Send response
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    timestamp: new Date().toISOString(),
    path: req.path,
  });
};
