const response = (statusCode, data, message, res) => {
  res.status(statusCode).json({
    payload: {
      status_code: statusCode,
      message: message,
      datas: data,
    },
    pagination: {
      prev: "",
      next: "",
      current: "",
    },
  });
};

module.exports = response;
