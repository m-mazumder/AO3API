const request = require('request');
const cheerio = require('cheerio');


const title_parse = require('./parsers/title_parse');
const author_parse = require('./parsers/author_parse');
const fandom_parse = require('./parsers/fandom_parse');
const summary_parse = require('./parsers/summary_parse');


const routes = (app) => {

  //general tags
  app.route('/gen/:selector')
    .get((req, res) => {
      var tag = req.params.selector.toLowerCase();
      tag = tag.replace(/_/g, '%20');

      //list to be returned
      var jsonList = [];

      //json components declaration
      var titles = [];
      var authors = [];
      var fandoms = [];
      var datetimes = [];
      var subTags = [];
      var tags = [];
      var summaries = [];
      var languages = [];
      var words = [];
      var chapters = [];

      request({
        method: 'GET',
        url: 'https://archiveofourown.org/tags/' + tag + '/works'
      }, function (err, response, body, callback) {
        if (err) return console.error(err);

        var $ = cheerio.load(body);

        //get title and author
        $('.work.blurb.group h4').each(function (i, elem) {
          titles.push(title_parse($(this).text()));
          authors.push(author_parse($(this).text()));
        });

        //get fandoms
        $('.work.blurb.group h5').each(function (i, elem) {
          fandoms.push(fandom_parse($(this).text()));
        });

        //get dates and summaries
        $('.work.blurb.group p').each(function (i, elem) {
          if ($(this).hasClass('datetime')) {
            datetimes.push($(this).text());
          }

        });

        //get tags
        $('.tags.commas li').each(function (i, elem) {
          if (!$(this).hasClass('warnings')) {
            subTags.push($(this).text());
            if ($(this).is(':last-child')) {
              tags.push(subTags);
              subTags = [];
            }
          }
        });

        //get story stats
        $('.stats dd').each(function (i, elem) {
          if ($(this).hasClass('language')) {
            languages.push($(this).text());
          }
          if ($(this).hasClass('words')) {
            words.push($(this).text());
          }
          if ($(this).hasClass('chapters')) {
            chapters.push($(this).text());
          }
        });

        //get summary
        $('.work.blurb.group blockquote').each(function (i, elem) {
          summaries.push(summary_parse($(this).text()));
        });


        for (var j = 0; j < titles.length; j++) {
          var json = {
            title: titles[j],
            author: authors[j],
            fandom: fandoms[j],
            datetime: datetimes[j],
            tag: tags[j],
            summary: summaries[j],
            language: languages[j],
            wordCount: words[j],
            chapterCount: chapters[j]
          };

          jsonList.push(json);
          //console.log(jsonList);
        }
        res.send(jsonList);
      });
    })

  app.route('/pair/:person1&:person2')
    .get((req, res) => {
      var tag1 = req.params.person1.toLowerCase();
      var tag2 = req.params.person2.toLowerCase();
      tag1 = tag1.replace(/_/g, '%20');
      tag2 = tag2.replace(/_/g, '%20');

      //list to be returned
      var jsonList = [];

      //json components declaration
      var titles = [];
      var authors = [];
      var fandoms = [];
      var datetimes = [];
      var subTags = [];
      var tags = [];
      var summaries = [];
      var languages = [];
      var words = [];
      var chapters = [];

      request({
        method: 'GET',
        url: 'https://archiveofourown.org/tags/' + tag1 + '*s*' + tag2 + '/works'
      }, function (err, response, body, callback) {
        if (err) return console.error(err);

        var $ = cheerio.load(body);

        //get title and author
        $('.work.blurb.group h4').each(function (i, elem) {
          titles.push(title_parse($(this).text()));
          authors.push(author_parse($(this).text()));
        });

        //get fandoms
        $('.work.blurb.group h5').each(function (i, elem) {
          fandoms.push(fandom_parse($(this).text()));
        });

        //get dates and summaries
        $('.work.blurb.group p').each(function (i, elem) {
          if ($(this).hasClass('datetime')) {
            datetimes.push($(this).text());
          }

        });

        //get tags
        $('.tags.commas li').each(function (i, elem) {
          if (!$(this).hasClass('warnings')) {
            subTags.push($(this).text());
            if ($(this).is(':last-child')) {
              tags.push(subTags);
              subTags = [];
            }
          }
        });

        //get story stats
        $('.stats dd').each(function (i, elem) {
          if ($(this).hasClass('language')) {
            languages.push($(this).text());
          }
          if ($(this).hasClass('words')) {
            words.push($(this).text());
          }
          if ($(this).hasClass('chapters')) {
            chapters.push($(this).text());
          }
        });

        //get summary
        $('.work.blurb.group blockquote').each(function (i, elem) {
          summaries.push(summary_parse($(this).text()));
        });


        for (var j = 0; j < titles.length; j++) {
          var json = {
            title: titles[j],
            author: authors[j],
            fandom: fandoms[j],
            datetime: datetimes[j],
            tag: tags[j],
            summary: summaries[j],
            language: languages[j],
            wordCount: words[j],
            chapterCount: chapters[j]
          };

          jsonList.push(json);
          //console.log(jsonList);
        }
        res.send(jsonList);
      });
    })


  //kudos tags
  app.route('/kudos/:selector')
    .get((req, res) => {
      var tag = req.params.selector.toLowerCase();
      tag = tag.replace(/_/g, '%20');

      //list to be returned
      var jsonList = [];

      //json components declaration
      var titles = [];
      var authors = [];
      var fandoms = [];
      var datetimes = [];
      var subTags = [];
      var tags = [];
      var summaries = [];
      var languages = [];
      var words = [];
      var chapters = [];

      request({
        method: 'GET',
        url: 'https://archiveofourown.org/works?utf8=%E2%9C%93&commit=Sort+and+Filter&work_search%5Bsort_column%5D=kudos_count&work_search%5Bother_tag_names%5D=&work_search%5Bquery%5D=&work_search%5Blanguage_id%5D=&work_search%5Bcomplete%5D=0&tag_id=' + tag
      }, function (err, response, body, callback) {
        if (err) return console.error(err);

        var $ = cheerio.load(body);

        //get title and author
        $('.work.blurb.group h4').each(function (i, elem) {
          titles.push(title_parse($(this).text()));
          authors.push(author_parse($(this).text()));
        });

        //get fandoms
        $('.work.blurb.group h5').each(function (i, elem) {
          fandoms.push(fandom_parse($(this).text()));
        });

        //get dates and summaries
        $('.work.blurb.group p').each(function (i, elem) {
          if ($(this).hasClass('datetime')) {
            datetimes.push($(this).text());
          }

        });

        //get tags
        $('.tags.commas li').each(function (i, elem) {
          if (!$(this).hasClass('warnings')) {
            subTags.push($(this).text());
            if ($(this).is(':last-child')) {
              tags.push(subTags);
              subTags = [];
            }
          }
        });

        //get story stats
        $('.stats dd').each(function (i, elem) {
          if ($(this).hasClass('language')) {
            languages.push($(this).text());
          }
          if ($(this).hasClass('words')) {
            words.push($(this).text());
          }
          if ($(this).hasClass('chapters')) {
            chapters.push($(this).text());
          }
        });

        //get summary
        $('.work.blurb.group blockquote').each(function (i, elem) {
          summaries.push(summary_parse($(this).text()));
        });


        for (var j = 0; j < titles.length; j++) {
          var json = {
            title: titles[j],
            author: authors[j],
            fandom: fandoms[j],
            datetime: datetimes[j],
            tag: tags[j],
            summary: summaries[j],
            language: languages[j],
            wordCount: words[j],
            chapterCount: chapters[j]
          };

          jsonList.push(json);
          //console.log(jsonList);
        }
        res.send(jsonList);
      });
    })


  app.route('/kudos_pair/:person1&:person2')
    .get((req, res) => {
      var tag1 = req.params.person1.toLowerCase();
      var tag2 = req.params.person2.toLowerCase();
      tag1 = tag1.replace(/_/g, '+');
      tag2 = tag2.replace(/_/g, '+');

      //list to be returned
      var jsonList = [];

      //json components declaration
      var titles = [];
      var authors = [];
      var fandoms = [];
      var datetimes = [];
      var subTags = [];
      var tags = [];
      var summaries = [];
      var languages = [];
      var words = [];
      var chapters = [];

      request({
        method: 'GET',
        url: 'https://archiveofourown.org/works?utf8=%E2%9C%93&commit=Sort+and+Filter&work_search%5Bsort_column%5D=kudos_count&work_search%5Bother_tag_names%5D=&work_search%5Bquery%5D=&work_search%5Blanguage_id%5D=&work_search%5Bcomplete%5D=0&tag_id=' + tag1 + '*s*' + tag2
      }, function (err, response, body, callback) {
        if (err) return console.error(err);

        var $ = cheerio.load(body);

        //get title and author
        $('.work.blurb.group h4').each(function (i, elem) {
          titles.push(title_parse($(this).text()));
          authors.push(author_parse($(this).text()));
        });

        //get fandoms
        $('.work.blurb.group h5').each(function (i, elem) {
          fandoms.push(fandom_parse($(this).text()));
        });

        //get dates and summaries
        $('.work.blurb.group p').each(function (i, elem) {
          if ($(this).hasClass('datetime')) {
            datetimes.push($(this).text());
          }

        });

        //get tags
        $('.tags.commas li').each(function (i, elem) {
          if (!$(this).hasClass('warnings')) {
            subTags.push($(this).text());
            if ($(this).is(':last-child')) {
              tags.push(subTags);
              subTags = [];
            }
          }
        });

        //get story stats
        $('.stats dd').each(function (i, elem) {
          if ($(this).hasClass('language')) {
            languages.push($(this).text());
          }
          if ($(this).hasClass('words')) {
            words.push($(this).text());
          }
          if ($(this).hasClass('chapters')) {
            chapters.push($(this).text());
          }
        });

        //get summary
        $('.work.blurb.group blockquote').each(function (i, elem) {
          summaries.push(summary_parse($(this).text()));
        });


        for (var j = 0; j < titles.length; j++) {
          var json = {
            title: titles[j],
            author: authors[j],
            fandom: fandoms[j],
            datetime: datetimes[j],
            tag: tags[j],
            summary: summaries[j],
            language: languages[j],
            wordCount: words[j],
            chapterCount: chapters[j]
          };

          jsonList.push(json);
          //console.log(jsonList);
        }
        res.send(jsonList);
      });
    }
    )
  
  //comments tags
  app.route('/comments/:selector')
    .get((req, res) => {
      var tag = req.params.selector.toLowerCase();
      tag = tag.replace(/_/g, '+');

      //list to be returned
      var jsonList = [];

      //json components declaration
      var titles = [];
      var authors = [];
      var fandoms = [];
      var datetimes = [];
      var subTags = [];
      var tags = [];
      var summaries = [];
      var languages = [];
      var words = [];
      var chapters = [];

      request({
        method: 'GET',
        url: 'https://archiveofourown.org/works?utf8=%E2%9C%93&commit=Sort+and+Filter&work_search%5Bsort_column%5D=comments_count&work_search%5Bother_tag_names%5D=&work_search%5Bquery%5D=&work_search%5Blanguage_id%5D=&work_search%5Bcomplete%5D=0&tag_id=' + tag
      }, function (err, response, body, callback) {
        if (err) return console.error(err);

        var $ = cheerio.load(body);

        //get title and author
        $('.work.blurb.group h4').each(function (i, elem) {
          titles.push(title_parse($(this).text()));
          authors.push(author_parse($(this).text()));
        });

        //get fandoms
        $('.work.blurb.group h5').each(function (i, elem) {
          fandoms.push(fandom_parse($(this).text()));
        });

        //get dates and summaries
        $('.work.blurb.group p').each(function (i, elem) {
          if ($(this).hasClass('datetime')) {
            datetimes.push($(this).text());
          }

        });

        //get tags
        $('.tags.commas li').each(function (i, elem) {
          if (!$(this).hasClass('warnings')) {
            subTags.push($(this).text());
            if ($(this).is(':last-child')) {
              tags.push(subTags);
              subTags = [];
            }
          }
        });

        //get story stats
        $('.stats dd').each(function (i, elem) {
          if ($(this).hasClass('language')) {
            languages.push($(this).text());
          }
          if ($(this).hasClass('words')) {
            words.push($(this).text());
          }
          if ($(this).hasClass('chapters')) {
            chapters.push($(this).text());
          }
        });

        //get summary
        $('.work.blurb.group blockquote').each(function (i, elem) {
          summaries.push(summary_parse($(this).text()));
        });


        for (var j = 0; j < titles.length; j++) {
          var json = {
            title: titles[j],
            author: authors[j],
            fandom: fandoms[j],
            datetime: datetimes[j],
            tag: tags[j],
            summary: summaries[j],
            language: languages[j],
            wordCount: words[j],
            chapterCount: chapters[j]
          };

          jsonList.push(json);
          //console.log(jsonList);
        }
        res.send(jsonList);
      });
    }
    )
  
  app.route('/comments_pair/:person1&:person2')
    .get((req, res) => {
      var tag1 = req.params.person1.toLowerCase();
      var tag2 = req.params.person2.toLowerCase();
      tag1 = tag1.replace(/_/g, '+');
      tag2 = tag2.replace(/_/g, '+');

      //list to be returned
      var jsonList = [];

      //json components declaration
      var titles = [];
      var authors = [];
      var fandoms = [];
      var datetimes = [];
      var subTags = [];
      var tags = [];
      var summaries = [];
      var languages = [];
      var words = [];
      var chapters = [];

      request({
        method: 'GET',
        url: 'https://archiveofourown.org/works?utf8=%E2%9C%93&commit=Sort+and+Filter&work_search%5Bsort_column%5D=comments_count&work_search%5Bother_tag_names%5D=&work_search%5Bquery%5D=&work_search%5Blanguage_id%5D=&work_search%5Bcomplete%5D=0&tag_id=' + tag1 + '*s*' + tag2
      }, function (err, response, body, callback) {
        if (err) return console.error(err);

        var $ = cheerio.load(body);

        //get title and author
        $('.work.blurb.group h4').each(function (i, elem) {
          titles.push(title_parse($(this).text()));
          authors.push(author_parse($(this).text()));
        });

        //get fandoms
        $('.work.blurb.group h5').each(function (i, elem) {
          fandoms.push(fandom_parse($(this).text()));
        });

        //get dates and summaries
        $('.work.blurb.group p').each(function (i, elem) {
          if ($(this).hasClass('datetime')) {
            datetimes.push($(this).text());
          }

        });

        //get tags
        $('.tags.commas li').each(function (i, elem) {
          if (!$(this).hasClass('warnings')) {
            subTags.push($(this).text());
            if ($(this).is(':last-child')) {
              tags.push(subTags);
              subTags = [];
            }
          }
        });

        //get story stats
        $('.stats dd').each(function (i, elem) {
          if ($(this).hasClass('language')) {
            languages.push($(this).text());
          }
          if ($(this).hasClass('words')) {
            words.push($(this).text());
          }
          if ($(this).hasClass('chapters')) {
            chapters.push($(this).text());
          }
        });

        //get summary
        $('.work.blurb.group blockquote').each(function (i, elem) {
          summaries.push(summary_parse($(this).text()));
        });


        for (var j = 0; j < titles.length; j++) {
          var json = {
            title: titles[j],
            author: authors[j],
            fandom: fandoms[j],
            datetime: datetimes[j],
            tag: tags[j],
            summary: summaries[j],
            language: languages[j],
            wordCount: words[j],
            chapterCount: chapters[j]
          };

          jsonList.push(json);
          //console.log(jsonList);
        }
        res.send(jsonList);
      });
    }
    )
  
  //search
  app.route('/search/:search')
    .get((req, res) => {
      var tag = req.params.search.toLowerCase();
      tag = tag.replace(/_/g, '+');;

      //list to be returned
      var jsonList = [];

      //json components declaration
      var titles = [];
      var authors = [];
      var fandoms = [];
      var datetimes = [];
      var subTags = [];
      var tags = [];
      var summaries = [];
      var languages = [];
      var words = [];
      var chapters = [];

      request({
        method: 'GET',
        url: 'https://archiveofourown.org/works/search?utf8=%E2%9C%93&work_search%5Bquery%5D=' + tag
      }, function (err, response, body, callback) {
        if (err) return console.error(err);

        var $ = cheerio.load(body);

        //get title and author
        $('.work.blurb.group h4').each(function (i, elem) {
          titles.push(title_parse($(this).text()));
          authors.push(author_parse($(this).text()));
        });

        //get fandoms
        $('.work.blurb.group h5').each(function (i, elem) {
          fandoms.push(fandom_parse($(this).text()));
        });

        //get dates and summaries
        $('.work.blurb.group p').each(function (i, elem) {
          if ($(this).hasClass('datetime')) {
            datetimes.push($(this).text());
          }

        });

        //get tags
        $('.tags.commas li').each(function (i, elem) {
          if (!$(this).hasClass('warnings')) {
            subTags.push($(this).text());
            if ($(this).is(':last-child')) {
              tags.push(subTags);
              subTags = [];
            }
          }
        });

        //get story stats
        $('.stats dd').each(function (i, elem) {
          if ($(this).hasClass('language')) {
            languages.push($(this).text());
          }
          if ($(this).hasClass('words')) {
            words.push($(this).text());
          }
          if ($(this).hasClass('chapters')) {
            chapters.push($(this).text());
          }
        });

        //get summary
        $('.work.blurb.group blockquote').each(function (i, elem) {
          summaries.push(summary_parse($(this).text()));
        });


        for (var j = 0; j < titles.length; j++) {
          var json = {
            title: titles[j],
            author: authors[j],
            fandom: fandoms[j],
            datetime: datetimes[j],
            tag: tags[j],
            summary: summaries[j],
            language: languages[j],
            wordCount: words[j],
            chapterCount: chapters[j]
          };

          jsonList.push(json);
          //console.log(jsonList);
        }
        res.send(jsonList);
      });
    }
  )


}

module.exports = routes;