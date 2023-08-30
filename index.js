const fs = require("fs");

const mdLinks = (path) => {
return new Promise( (resolve, reject) => {
  if (fs.existsSync(path)){ //Identifica si la ruta existe
    // comprobar o convertir a una ruta absoluta
    // Comprobar si es archivo o directorio
    // si es un directorio filtrar los archivos MD
  } else {
    reject('La ruta no existe');// si no existe ejecuta reject
  }
});
};

module.exports = {
  mdLinks
};
