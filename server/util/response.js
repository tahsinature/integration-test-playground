module.exports = {
  success(message, res, data) {
    const response = res.status(200).json({
      success: true,
      flag: 200,
      message,
      result: data
    });
    return response;
  },
  error(message, res, flag = "0") {
    const response = res.status(500).json({
      success: false,
      flag,
      message
    });
    return response;
  },
  notFound(message, res, flag = "0") {
    const response = res.status(404).json({
      success: false,
      flag,
      message
    });
    return response;
  },
  invalidInput(message, res, flag = "0") {
    const response = res.status(400).json({
      success: false,
      flag,
      message
    });
    return response;
  },
  unauthorized(message, res, flag = "0") {
    const response = res.status(401).json({
      success: false,
      flag,
      message
    });
    return response;
  },
  forbidden(message, res, flag = "0") {
    const response = res.status(403).json({
      success: false,
      flag,
      message
    });
    return response;
  },
  conflict(message, res, flag = "0") {
    const response = res.status(409).json({
      success: false,
      flag,
      message
    });
    return response;
  }
};
