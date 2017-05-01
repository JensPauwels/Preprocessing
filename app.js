"use strict";



const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
let index = 0;


//command to run : node --max-old-space-size=8192 app.js
//add all the tables that you need in the array
const tablesThatINeed = ['arrival_delay','departure_state','arrival_actual'];
let tables = [];


const instream = fs.createReadStream('./files/Dataset.txt');
const outstream = new stream;
var rl = readline.createInterface(instream,outstream);

const determineTables = (row) => {
  row.split(',').forEach((column,index) => {
    if (tablesThatINeed.indexOf(column) !== -1) tables.push(index);
  });
};

let content = '';

rl.on('line',(row) => {
  if(index === 0) determineTables(row);
  row.split(',').forEach((column,index) => {
    if(tables.indexOf(index) !== -1) {
      content += (index === tables[tables.length - 1]) ? column : `${column},`;
    }
  });
  content += '\n';
  console.log(index);
  index++;
});

rl.on('close', () => {
  fs.writeFile('./files/newData.txt',content,'utf8', (err) => {
    if (err) console.log(err);
    console.log('thanks for using the service!');
  });
});
