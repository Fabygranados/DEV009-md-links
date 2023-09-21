#!/usr/bin/env node
const { mdLinks } = require('./index');
const dirPath = process.argv[2];
const options = process.argv.slice(3);
const { statsValidates, stats } = require('./data');

if (!dirPath) {
  console.log(' Ohhh noo!! ERROR')
} else if (dirPath && options.length === 0) {
  mdLinks(dirPath)
    .then((links) => {
      console.log(links)
    })
    .catch((error) => {
      console.log(error);
    });
} else {
  mdLinks(dirPath, options)
    .then((links) => {
      if (options.includes('--stats') && options.includes('--validate')){
        console.log(('Validaciones: \n'),statsValidates(links))
      } else if (options.includes('--stats')) {
        console.log(('Numero de links encontrados: \n'), stats(links))
      } else if (options.includes('--validate')) {
        console.log(('Se han encontrado y validado los siguientes links: \n'), links)
      } else {
        console.log((`${options} Opcion invalida! Por favor escoge  --stats y/o --validate`))
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
