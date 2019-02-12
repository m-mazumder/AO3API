const summary_parse = (str) => {
  var a = str;
  var summary = a.replace('\n      ', '');
  var cut = summary.substring(summary.indexOf('\n'), summary.length);
  summary = summary.replace(cut, '');
  return summary;
}

module.exports = summary_parse;