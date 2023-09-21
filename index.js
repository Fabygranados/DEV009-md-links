const { convertAbsolutePath, existsPath, valLinks, markdownContent } = require('./data');
const tFunk = require('tfunk');

function mdLinks(relPath, options) {
  return new Promise((resolve, reject) => {
    const absolutePath = convertAbsolutePath(relPath); 
    if (!existsPath(absolutePath)) {
      reject(tFunk('{red:Esta ruta no existe (^///^)(^///^)}'));
      return;
    } 
    markdownContent(absolutePath)
      .then((links) => {
        if (links.length > 0) {
          resolve(options ? valLinks(links) : links);
        } else {
          reject(tFunk('{red: Ohhh nooo!!! {blue:(⓿_⓿)(⓿_⓿)}  Este documento no contiene links!!'));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });
}
module.exports = {
  mdLinks
};