var axios = require('axios').default
var cheerio = require('cheerio')

axios.get('https://shouji.hwcha.com/18870968244')
  .then(function(response) {
    console.log();
    getData(response.data)
  })

function getData(html) {
  var $ = cheerio.load(html)
  var $pList = $('div .container .panel-body p')
  console.log($pList);
}