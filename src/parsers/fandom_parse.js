const fandom_parse = (str) => {
  var a = str;
  var fandomList = [];
  var fandom = a.replace('\n      Fandoms:\n      ', '');
  var cut = fandom.substring(fandom.indexOf('\n'), fandom.length);
  fandom = fandom.replace(cut, '');
  fandomList = fandom.split(', ');
  return fandomList;
}

module.exports = fandom_parse;