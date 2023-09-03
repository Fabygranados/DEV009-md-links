const fs = require("fs");
const path = require('path');

const mdLinks = (dirPath) => {
  const absolutePath = convertAbsolutePath(dirPath);
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dirPath)) {
      const isDirectory = fs.lstatSync(dirPath).isDirectory();

      if (!isDirectory) {
        const fileExtension = path.extname(dirPath);
        if (fileExtension !== '.md') {
          reject('(⓿_⓿) Upss!! ERROR!! (⓿_⓿) El archivo no es un Markdown');
        } else {
          const markdownContent = fs.readFileSync(dirPath, 'utf8');
        console.log(markdownContent);
          resolve(dirPath);
        }
      } else {
        const files = fs.readdirSync(dirPath);
        const mdFiles = files.filter(file => {
          const fileExtension = path.extname(file);
          return fileExtension === '.md';
        });
        resolve(mdFiles);
      }

    } else {
      reject('_______(⓿_⓿) Upss!! ERROR!! (⓿_⓿)_______');
    }
  });
};

function convertAbsolutePath(relPath) {
  return path.resolve(relPath);
}

module.exports = {
  mdLinks
};