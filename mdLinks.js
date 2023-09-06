#!/usr/bin/env node
const { mdLinks } = require('./index');

const dirPath = process.argv[2];

mdLinks(dirPath)
  .then((result) => {
    console.log('Yey!! (￣y▽￣)╭ Ohohoho.....' + result);
  })
  .catch((error) => {
    console.log(error);
  });
  
