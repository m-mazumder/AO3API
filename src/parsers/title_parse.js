const title_parse = (str) => {
  var a = str;
  var title = a.replace('\n      ', '');
  title = title.substring(0, title.indexOf('\n'));
  return title;
}

module.exports = title_parse;