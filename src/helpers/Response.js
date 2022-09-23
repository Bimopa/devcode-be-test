class Response {
  static error(status, message) {
    return {
      status: status,
      message: message,
      data: {}
    };
  }

  static success(data) {
    return {
      status: "Success",
      message: "Success",
      data: data,
    };
  }
}

module.exports = Response;
