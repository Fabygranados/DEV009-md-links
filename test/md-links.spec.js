
const { mdLinks } = require ('../index.js');
const { 
  getPath, 
  convertAbsolutePath, 
  existsPath, 
  getFiles,
  extractLinks,
  valLinks,
  stats,
  statsValidates,
  markdownContent
 } = require ('../data.js');
const fs = require('fs');
const { describe } = require('test');

describe('mdLinks', () => {
  it('should...', () => {
    console.log('👾👾👾🔮🔮!!');
  });
  // regresa con un mensaje de error cuando la ruta entregada no existe
  it('Debería rechazar con un mensaje de error cuando se le proporciona una ruta de archivo que no existe', () => {
  return expect(mdLinks('nonexistent/path.md')).rejects.toMatch('Esta ruta no existe (^///^)(^///^)');
      });
  it('Deberia retorna un arreglo con los links cuando se le pasa una ruta y archivos validos', () => {
      const relPath = 'valid/path/to/markdown.md';
      const options = { validate: true };

      // Creacion de la ruta 
      const fs = require('fs');
      fs.mkdirSync('valid/path/to', { recursive: true });

      // Creacion de un archivo valido
      fs.writeFileSync(relPath, '# Archivo MD \n[link](http://example.com)');

      return mdLinks(relPath, options)
        .then((result) => {
          expect(Array.isArray(result)).toBe(true);
          expect(result.length).toBeGreaterThan(0);
          expect(result[0]).toHaveProperty('href');
          expect(result[0]).toHaveProperty('text');
          expect(result[0]).toHaveProperty('status');
          expect(result[0]).toHaveProperty('statusText');
        });
    });
    it('debe resolverse con una serie de enlaces con propiedades href, texto y archivo cuando se le proporciona una ruta de archivo válido y un objeto de opciones con la propiedad de validación establecida en true', () => {
      return mdLinks('valid/path/to/markdown.md', { validate: true })
        .then((result) => {
          expect(Array.isArray(result)).toBe(true);
          expect(result.length).toBeGreaterThan(0);
          result.forEach((link) => {
            expect(link).toHaveProperty('href');
            expect(link).toHaveProperty('text');
            expect(link).toHaveProperty('file');
          });
        });
    });
       
    it('Debe resolverse con un arreglo de enlaces que tengan propiedades de href, texto y archivo cuando se le proporciona una ruta de archivo Markdown válida y un objeto de opciones con la propiedad --stats configurada en true', () => {
          const relPath = 'valid/path/to/markdown.md';
          const options = { stats: true };
    
          return mdLinks(relPath, options)
            .then((result) => {
              expect(Array.isArray(result)).toBe(true);
              expect(result.length).toBeGreaterThan(0);
              result.forEach((link) => {
                expect(link).toHaveProperty('href');
                expect(link).toHaveProperty('text');
                expect(link).toHaveProperty('file');
              });
            });
        });
      
    it('Debería rechazarlo con un mensaje de error cuando se le proporciona una ruta que no existe', () => {
      return expect(mdLinks('non/markdown/file.txt')).rejects.toMatch('Esta ruta no existe (^///^)(^///^)');
    });
});
describe('getPath', () => {
  it('Deberia retornar un arreglo con las rutas cuando se le pasa una ruta que contiene solo archivos validos', () => {
    // Verifica que el directorio exista
    if (fs.existsSync('directory1')) {
      // borra los archivos
      fs.unlinkSync('directory1/file1.md');
      fs.unlinkSync('directory1/file2.md');
      fs.rmdirSync('directory1');
    }
    
    // Crea directorio 
    fs.mkdirSync('directory1');

    // Crea los archivos y directorios
    fs.writeFileSync('directory1/file1.md', '');
    fs.writeFileSync('directory1/file2.md', '');

    const result = getPath('directory1');
    expect(result).toEqual(['directory1\\file1.md', 'directory1\\file2.md']);

    // limpia todo 
    fs.unlinkSync('directory1/file1.md');
    fs.unlinkSync('directory1/file2.md');
    fs.rmdirSync('directory1');
  });
   it('Debería devolver un arreglo vacío cuando se le proporciona un directorio sin archivos Markdown.', () => {
        const directoryName = 'testDirectory';
        if (!fs.existsSync(directoryName)) {
          fs.mkdirSync(directoryName);
        }
        const result = getPath(directoryName);
        expect(result).toEqual([]);
        if (fs.existsSync(directoryName)) {
          fs.rmdirSync(directoryName);
        }
      });
});
describe('convertAbsolutePath', () => {
    // Returns an error when given a non-string input
    it('Debería devolver un error cuando se le proporciona una entrada que no es una cadena de texto.', () => {
      const relPath = 123;
      expect(() => convertAbsolutePath(relPath)).toThrowError('The "path" argument must be of type string. Received type number (123)');
    });
    // Returns the same path when given an absolute path
    it('Debe retornar el mismo path cuando se le proporciona una ruta absoluta.', () => {
    const absPath = '/absolute/path/to/file.txt';
    const result = convertAbsolutePath(absPath);
    expect(result).toBe('C:\\absolute\\path\\to\\file.txt');
        });
});
describe('existPath', () => {
      it('Debería devolver true cuando el archivo existe', () => {
        const fsMock = require('fs');
        fsMock.existsSync = jest.fn().mockReturnValue(true);
  
        const result = existsPath('path/to/file');
  
        expect(result).toBe(true);
        expect(fsMock.existsSync).toHaveBeenCalledWith('path/to/file');
      });
    it('Debería devolver false cuando el archivo no existe', () => {
      const fsMock = require('fs');
      fsMock.existsSync = jest.fn().mockReturnValue(false);

      const result = existsPath('path/to/nonexistentfile');

      expect(result).toBe(false);
      expect(fsMock.existsSync).toHaveBeenCalledWith('path/to/nonexistentfile');
    });
});
describe('getFiles', () => {
      it('Debería resolverse como un arreglo vacío cuando se le pasa una ruta válida de archivo Markdown', () => {
        const relPath = 'valid/markdown/file.md';
        const expectedLinks = [];
  
        return getFiles(relPath).then((links) => {
          expect(links).toEqual(expectedLinks);
        });
      });
    it('Debería rechazarse con un mensaje de error cuando se le pasa una ruta válida de archivo con una extensión que no es de Markdown', () => {
      const relPath = 'valid/file/path.txt';

      return expect(getFiles(relPath)).rejects.toMatch('No es un archivo MarkDown');
    });
 });
 describe('extractLinks', () => { 
    it('Debería extraer un enlace href y sin texto de los datos.', () => {
      const data = 'This is a [](https://example.com)';
      const relPath = 'example.md';

      const result = extractLinks(data, relPath);

      expect(result).toEqual([{ href: 'https://example.com', text: '', file: 'example.md' }]);
    });
 });
 describe('valLinks', () => {   
  it('Debería devolver un arreglo de objetos con propiedades texto, href, archivo, estado y estadoTexto cuando se le pasa un arreglo de objetos de enlaces', () => {
    const links = [
      { text: 'Link 1', href: 'http://example.com/link1', file: 'file1.txt' },
      { text: 'Link 2', href: 'http://example.com/link2', file: 'file2.txt' },
      { text: 'Link 3', href: 'http://example.com/link3', file: 'file3.txt' }
    ];

    const expected = [
      { text: 'Link 1', href: 'http://example.com/link1', file: 'file1.txt', status: 404, statusText: 'Not Found' },
      { text: 'Link 2', href: 'http://example.com/link2', file: 'file2.txt', status: 404, statusText: 'Not Found' },
      { text: 'Link 3', href: 'http://example.com/link3', file: 'file3.txt', status: 404, statusText: 'Not Found' }
    ];

    return valLinks(links).then((result) => {
      expect(result).toEqual(expected);
    });
  }); 
});
describe('stats', () => { 
      it('Debería devolver un objeto con propiedades Total y Únicos', () => {
        const links = [{ href: 'link1' }, { href: 'link2' }, { href: 'link3' }];
        const result = stats(links);
        expect(result).toHaveProperty('Total');
        expect(result).toHaveProperty('Unique');
      });
        it('No debería arrojar un error si el arreglo de entrada contiene elementos que no son objetos', () => {
          const links = [{ href: 'link1' }, 'not an object', { href: 'link3' }];
          expect(() => {
            stats(links);
          }).not.toThrowError();
        });
});
describe('validateLinks', () => {
    it('Debería devolver un objeto con las propiedades Total, unique, OK y Broken', () => {
      const links = [
        { href: 'https://example.com', statusText: 'OK' },
        { href: 'https://example.com', statusText: 'OK' },
        { href: 'https://example.com', statusText: 'Fail' },
      ];

      const result = statsValidates(links);

      expect(result).toHaveProperty('Total');
      expect(result).toHaveProperty('Unique');
      expect(result).toHaveProperty('OK');
      expect(result).toHaveProperty('Broken');
    });
        it('Debería calcular el valor Total correcto para un arreglo de enlaces', () => {
          const links = [
            { href: 'https://example.com', statusText: 'OK' },
            { href: 'https://example.com', statusText: 'OK' },
            { href: 'https://example.com', statusText: 'Fail' },
          ];
    
          const result = statsValidates(links);
    
          expect(result.Total).toBe(3);
        });
    it('Debería devolver un objeto con todas las propiedades en 0 para un arreglo vacío de enlaces.', () => {
      const links = [];

      const result = statsValidates(links);

      expect(result.Total).toBe(0);
      expect(result.Unique).toBe(0);
      expect(result.OK).toBe(0);
      expect(result.Broken).toBe(0);
    });
});

describe('markdownContent', () => { 
      it('Debería devolver un arreglo de objetos con propiedades href, texto y archivo cuando se le pase una ruta a un solo archivo Markdown', () => {
        const relPath = 'path/to/single/markdown/file.md';
        const expected = [
          {
            href: 'https://example.com',
            text: 'Example',
            file: 'path/to/single/markdown/file.md'
          }
        ];
  
        // Crea las carpetas necesarias para crear el archivo markdown
        fs.mkdirSync('path/to/single/markdown', { recursive: true });
  
        // Crea el texto de un archivo markdown
        fs.writeFileSync(relPath, '[Example](https://example.com)');
  
        return markdownContent(relPath).then((result) => {
          expect(result).toEqual(expected);
  
          // Limpia todo lo que se creo en el test
          fs.unlinkSync(relPath);
        });
      });
});


