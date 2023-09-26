
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const tFunk = require('tfunk');

const convertAbsolutePath = (relPath) => path.resolve(relPath);

const existsPath = (relPath) => fs.existsSync(relPath);

const markdownContent = (relPath) => {
  const isDirectory = fs.statSync(relPath).isDirectory();

  if (isDirectory) {
    const files = getPath(relPath);
    const allFiles = files.map((file) => getFiles(file));
    return Promise.all(allFiles).then((links) => links.flat());
  }

  return getFiles(relPath);
};

const getPath = (relPath) => {
  const allPaths = [];
  const files = fs.readdirSync(relPath);

  files.forEach((file) => {
    const absolutePath = path.join(relPath, file);
    const stat = fs.statSync(absolutePath);

    if (stat.isDirectory()) {
      const sub = getPath(absolutePath); // Recursividad
      allPaths.push(...sub);
    } else if (extension(absolutePath) === '.md') {
      allPaths.push(absolutePath);
    }
  });

  return allPaths;
};

const extension = (relPath) => path.extname(relPath);

const getFiles = (relPath) =>
  new Promise((resolve, reject) => {
    fs.readFile(relPath, 'utf8', (err, data) => {
      if (extension(relPath) === '.md') {
        // console.log(data);
        resolve(extractLinks(data, relPath));
      } else {
        reject(tFunk('{red:No es un archivo MarkDown {gray:◑﹏◐} (.md)'));
      }
    });
  });

const extractLinks = (data, relPath) => {
  const linkRegex = /\[(.*?)\]\((https?:\/\/.*?)\)/g;
  const links = [];

  let match;

  while ((match = linkRegex.exec(data))) {
    const text = match[1];
    const href = match[2];
    const file = relPath;
    links.push({ href, text, file });
  }
  return links;
};

const valLinks = (links) => {
  const validate = links.map(link =>{
    return fetch(link.href)
    .then((response)=> {
      return {
        text: link.text,
        href: link.href,
        file: link.file,
        status: response.status,
        statusText: response.statusText
      }
    }).catch((error) => {
      return {
        text: link.text,
        href: link.href,
        file: link.file,
        status: error.response ? error.response.status : 'no response',
        statusText: 'Fail'
      }
    })
  })

  // Utiliza Promise.all() para esperar a que todas las promesas se resuelvan
  return Promise.all(validate);
};
const stats = (links) => ({
  Total: links.length,
  Unique: new Set(links.map(({ href }) => href)).size,
});

const statsValidates = (links) => ({
  Total: links.length,
  Unique: new Set(links.map(({ href }) => href)).size,
  OK: links.filter(({ statusText }) => statusText === 'OK').length,
  Broken: links.filter(({ statusText }) => statusText === 'Fail').length,
});

module.exports = {
  convertAbsolutePath,
  extractLinks,
  markdownContent,
  existsPath,
  getPath,
  getFiles,
  valLinks,
  statsValidates,
  stats,
};