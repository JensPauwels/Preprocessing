"use strict";



const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
const instream = fs.createReadStream('./files/Dataset.txt');
const outstream = new stream;
const rl = readline.createInterface(instream,outstream);
const tablesThatINeed = ['date','arrival_delay','departure_state','arrival_actual'];
let tables = [];
let index = 0;
let contentIdx = 1;

let contents = {
  content1: '',
  content2: '',
  content3: '',
  content4: '',
  content5: ''
}

let currentContent = contents[`content${1}`];


const determineTables = (row) => {
  row.split(',').forEach((column,index) => {
    if (tablesThatINeed.indexOf(column) !== -1) tables.push(index);
  });
};



rl.on('line',(row) => {
  if(index === 0) determineTables(row);
  row.split(',').forEach((column,index) => {
    if( contents[`content${contentIdx}`].length > 100000000 ) {
      contentIdx++;
    }
    if(tables.indexOf(index) !== -1) {
      if(index === tables[tables.length - 1] ){
        contents[`content${contentIdx}`] += column;
      }
      else{
        contents[`content${contentIdx}`] += `${column},`;
      }
    }
  });
  contents[`content${contentIdx}`] += '\n';
  console.log(index);
  index++;
});

rl.on('close', () => {
  console.log(contents.content1);
  fs.writeFile('./files/newData.txt',contents.content1,'utf8', (err) => {
    if (err) console.log(err);
    console.log('thanks for using the service!');
  });

  for(let i = 2 ; i < 6 ; i++){
    if(contents[`content${i}`] !== ''){
      fs.appendFile('./files/newData.txt',contents[`content${i}`],'utf8', (err) => {
        if (err) console.log(err);
      });
    }
  };
});
