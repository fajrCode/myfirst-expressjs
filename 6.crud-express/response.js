const response = (statusCode, data, message, res) => {
  res.status(statusCode).json({
    status: statusCode,
    message: message,
    data: data,
    pagination: {
      prev: "",
      next: "",
      current: "",
    },
  });
};

module.exports = response;
