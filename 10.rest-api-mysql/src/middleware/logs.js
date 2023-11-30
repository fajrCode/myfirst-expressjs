const logRequest = (req, res, next) => {
  console.log(`Terjadi request ${req.method} ke PATH ${req.path}`);
  next();
};

module.exports = logRequest;
