function getRandomString(
  length,
  chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
) {
  var result = '';
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

function getRandomNum(length) {
  let text = '';
  const possible = '0123456789';

  for (let i = length; i > 0; --i) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  
  return text;
}

module.exports = { getRandomString, getRandomNum };
