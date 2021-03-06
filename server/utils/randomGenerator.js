/**
 * Generate random string
 * @param {Number} length - length of the random string
 * @param {String} chars - character sequence to be used to generate random sequence
 * @returns {String} random string
 */
function getRandomString(
  length,
  chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
) {
  var result = '';
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

module.exports = { getRandomString };
