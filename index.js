const fs = require("fs");
const path = require('path');


const mdLinks = (dirPath) => {
  const absolutePath = convertAbsolutePath(dirPath);
  return new Promise((resolve, reject) => {
    if (fs.existsSync(absolutePath)) {
      const isDirectory = fs.lstatSync(absolutePath).isDirectory();

      if (!isDirectory) {
        const fileExtension = path.extname(dirPath);
        if (fileExtension !== '.md') {
          reject('(⓿_⓿) Upss!! ERROR!! (⓿_⓿) El archivo no es un Markdown');
        } else {
          const markdownContent = fs.readFileSync(absolutePath, 'utf8');
          const links = extractLinks(markdownContent);
          const link = links.map((link) => ({ href: link.href, text: link.text }));
          console.log(markdownContent, link);
          resolve(absolutePath);
        }
      } else {
        const files = fs.readdirSync(absolutePath);
        const mdFiles = files.filter((file) => {
          const fileExtension = path.extname(file);
          return fileExtension === '.md';
        });
        const mdFileMap = mdFiles.map((file) => ({ href: file, text: file }));
        resolve(mdFileMap);
      }
    } else {
      reject('_______(⓿_⓿) Upss!! ERROR!! (⓿_⓿)_______');
    }
  });
};
function convertAbsolutePath(relPath) {
  return path.resolve(relPath);
}
function extractLinks(markdownContent) {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)(?!\s|$)/g;
  const links = [];

  let match;

  while ((match = linkRegex.exec(markdownContent))) {
    const text = match[1];
    const href = match[2];
    links.push({ href, text});
  }
  return links;
}
module.exports = {
  mdLinks,
  convertAbsolutePath,
  extractLinks
};