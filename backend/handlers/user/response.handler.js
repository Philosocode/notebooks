// create shared representational state
module.exports = function getUserResponse(status, data) {
  return {
    status,
    data,
  };
}
