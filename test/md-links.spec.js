
const { mdLinks } = require ('../index.js');
const { convertAbsolutePath } = require ('../index.js');
const { extractLinks } = require ('../index.js');
const fs = require('fs');
const path = require('path');


describe('mdLinks', () => {
  it('should...', () => {
    console.log('👾👾👾🔮🔮!!');
  });
  it('Deberia rechazar cuando la ruta no existe', () => {
    return mdLinks('/documents/cursos/faby.md').catch((error) => {
      expect(error).toBe("_______(⓿_⓿) Upss!! ERROR!! (⓿_⓿)_______");
    });
  })
      it('Deberia devolver una ruta absoluta cuando se le pasa una ruta relativa con un archivo md con un enlace', () => {
        const filePath = 'path/to/file.md';
        const expected = 'C:\\Users\\fabyg\\OneDrive\\Documents\\GitHub\\DEV009-md-links\\path\\to\\file.md';
  
        // Mock the fs.existsSync 
        jest.spyOn(fs, 'existsSync').mockReturnValue(true);
  
        // Mock the fs.lstatSync 
        jest.spyOn(fs, 'lstatSync').mockReturnValue({ isDirectory: () => false });
  
        // Mock the fs.readFileSync 
        jest.spyOn(fs, 'readFileSync').mockReturnValue('[Ejemplo](https://ejemplo.com)');
  
        return mdLinks(filePath).then((result) => {
          expect(result).toEqual(expected);
        });
      });
      it('Deberia rechazarse cuando la ruta no existe', () => {
        const dirPath = 'invalid/path';
        const expected = '(⓿_⓿) Upss!! ERROR!! (⓿_⓿) El archivo no es un Markdown';
        return mdLinks(dirPath).catch((error) => {
          expect(error).toBe(expected);
        });
      });
});

describe('convertAbsolutePath', () => {
    it('Deberia retornar la ruta absoluta cuando se pasa una ruta relativa', () => {
      const relPath = './folder/file.txt';
      const expected = path.resolve(relPath);
      const result = convertAbsolutePath(relPath);
      expect(result).toBe(expected);
      expect(path.isAbsolute(result)).toBe(true);
    });
  });

  describe('extractLinks', () => {
    it('Debe devolver un array vacio cuando no hay links', () => {
      const markdownContent = 'Aqui no hay links';
      const result = extractLinks(markdownContent);
      expect(result).toEqual([]);
    });
 }); 
  

