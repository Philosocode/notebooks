exports.trimString = function trimString(text, length) {
  return text.substring(0, length);
}

// FROM: https://flaviocopes.com/how-to-uppercase-first-letter-javascript/
exports.capitalizeFirstLetter = function(text) {
  if (typeof text !== 'string') return "";

  return text.charAt(0).toUpperCase() + text.slice(1);
}