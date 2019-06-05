module.exports = {
  success(message, res, data) {
    res.status(200).json({
      success: true,
      flag: 200,
      message,
      result: data
    });
  },
  error(message, res, flag = "0") {
    res.status(500).json({
      success: false,
      flag,
      message
    });
  },
  notFound(message, res, flag = "0") {
    res.status(404).json({
      success: false,
      flag,
      message
    });
  },
  badRequest(message, res, flag = "0") {
    res.status(400).json({
      success: false,
      flag,
      message
    });
  },
  unauthorized(message, res, flag = "0") {
    res.status(401).json({
      success: false,
      flag,
      message
    });
  },
  forbidden(message, res, flag = "0") {
    res.status(403).json({
      success: false,
      flag,
      message
    });
  },
  conflict(message, res, flag = "0") {
    res.status(409).json({
      success: false,
      flag,
      message
    });
  }
};
