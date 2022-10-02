#! /usr/bin/env node

/**
 * 从指定号码中筛选出移动号码
 */

var xlsx = require('node-xlsx');
var fs = require('fs');
var { program } = require('commander');

program
  .version("0.0.1")
  .requiredOption('-s --source <file>', 'Source excel file path')
  .option('-t --target <file>', 'Target excel file path', './ydTel.xlsx')
  .option('-l --lines <integer>', 'How many lines of phone numbers are required in each column of the target excel', 200)
  .parse(process.argv)

var options = program.opts();

var obj = xlsx.parse(options.source);

// 筛选出 134|135|136|137|138|139|147|150|151|152|157|158|159|172|178|182|183|184|187|188|195|197|198 开头的号码
var reg = /^(134|135|136|137|138|139|147|150|151|152|157|158|159|172|178|182|183|184|187|188|195|197|198)\d{8}$/

var result = new Array();
obj[0].data.forEach(x => {
  if(x.length != 0) {
    for(i = 0; i < x.length; i++) {
      if (reg.test(x[i])) {
        result.push(x[i])
      }
    }
  }
})

var resultData = new Array();

var maxLines = options.lines;
var total = result.length;

console.log("maxLines = %s", maxLines)

var columns = Math.ceil(total/maxLines);
var rows = Math.ceil(total/columns);

console.log("columns = %s, rows = %s", columns, rows);

for (i = 0, k = 0; i < rows; i++) {
  resultData[i] = new Array();
  // console.log(resultData[i]);
  for (j = 0; j < columns; j++) {
    resultData[i].push(result[k]);
    k++;
    if (k == result.length) {
      break;
    }
  }
}

var targetExcel = [
  {
    name: "Sheet1",
    data: resultData
  }
];

fs.writeFileSync(options.target, xlsx.build(targetExcel), "binary");
