const author_parse = (str) => {
  var a = str;
  var author = a.replace('\n      ', '');
  author = author.replace('\n      by\n        \n      \n      ', '*');
  author = author.replace('\n\n\n\n      \n      \n    ', '');
  if (author.indexOf('\n') != -1) {
    var remove = author.substring(author.indexOf('\n'), author.length);
    author = author.replace(remove, '');
  }
  author = author.substring(author.indexOf('*') + 1, author.length);
  return author;
}

module.exports = author_parse;