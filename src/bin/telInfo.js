var cheerio = require('cheerio');
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

let ajax = new XMLHttpRequest();
let html;
ajax.open('GET', 'https://shouji.hwcha.com/18870968244', false);
ajax.onreadystatechange = () => {
  if (ajax.readyState === 4 && ajax.status === 200) {
    html = ajax.responseText
  }
}
ajax.send();
const $ = cheerio.load(html);
const anchor = $('.container .panel-body p');
anchor.each(function() {
  let text = $(this).html()
  console.log(text)
})