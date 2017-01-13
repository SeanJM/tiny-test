module.exports = function log(value) {
  if (!this.isSilent) {
    console.log(value);
  }
};