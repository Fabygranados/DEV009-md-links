
const { mdLinks } = require ('../index.js');
const { getPath, 
  convertAbsolutePath, 
  existsPath, 
  getFiles,
  extractLinks } = require ('../data.js');
const fs = require('fs');
const { describe } = require('test');

describe('mdLinks', () => {
  it('should...', () => {
    console.log('👾👾👾🔮🔮!!');
  });
  // regresa con un mensaje de error cuando la ruta entregada no existe
  it('should reject with an error message when given a non-existent file path', () => {
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
});
describe('getPath', () => {
  it('Deberia retornar un arreglo con las rutas cuando se le pasa una ruta que contiene solo archivos validos', () => {
    // Check if the 'directory1' directory exists
    if (fs.existsSync('directory1')) {
      // Delete the 'directory1' directory and its contents
      fs.unlinkSync('directory1/file1.md');
      fs.unlinkSync('directory1/file2.md');
      fs.rmdirSync('directory1');
    }
    
    // Create the 'directory1' directory
    fs.mkdirSync('directory1');

    // Create the 'file1.md' and 'file2.md' files inside 'directory1'
    fs.writeFileSync('directory1/file1.md', '');
    fs.writeFileSync('directory1/file2.md', '');

    const result = getPath('directory1');
    expect(result).toEqual(['directory1\\file1.md', 'directory1\\file2.md']);

    // Clean up: delete the 'directory1' directory and its contents
    fs.unlinkSync('directory1/file1.md');
    fs.unlinkSync('directory1/file2.md');
    fs.rmdirSync('directory1');
  });
   // Returns an empty array when given a directory with no markdown files
   it('should return an empty array when given a directory with no markdown files', () => {
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
  // Handles the error that occurs when given a non-existent directory
  it('Deberia retornar error cuando se le pasa una ruta que no existe', () => {
    try {
      const result = getPath('nonexistent');
      expect(result).toEqual([]);
    } catch (error) {
      expect(error.message).toBe("ENOENT: no such file or directory, scandir 'nonexistent'");
    }
  });
});
describe('convertAbsolutePath', () => {
    // Returns an error when given a non-string input
    it('should return an error when given a non-string input', () => {
      const relPath = 123;
      expect(() => convertAbsolutePath(relPath)).toThrowError('The "path" argument must be of type string. Received type number (123)');
    });
    // Returns the same path when given an absolute path
    it('should return the same path when given an absolute path', () => {
    const absPath = '/absolute/path/to/file.txt';
    const result = convertAbsolutePath(absPath);
    expect(result).toBe('C:\\absolute\\path\\to\\file.txt');
        });
});
describe('existPath', () => {
      // Returns true when the file exists
      it('should return true when the file exists', () => {
        const fsMock = require('fs');
        fsMock.existsSync = jest.fn().mockReturnValue(true);
  
        const result = existsPath('path/to/file');
  
        expect(result).toBe(true);
        expect(fsMock.existsSync).toHaveBeenCalledWith('path/to/file');
      });
          // Returns false when the file does not exist
    it('should return false when the file does not exist', () => {
      const fsMock = require('fs');
      fsMock.existsSync = jest.fn().mockReturnValue(false);

      const result = existsPath('path/to/nonexistentfile');

      expect(result).toBe(false);
      expect(fsMock.existsSync).toHaveBeenCalledWith('path/to/nonexistentfile');
    });
});
describe('getFiles', () => {
      // Returns a promise that resolves to an empty array when passed a valid markdown file path
      it('should resolve to an empty array when passed a valid markdown file path', () => {
        const relPath = 'valid/markdown/file.md';
        const expectedLinks = [];
  
        return getFiles(relPath).then((links) => {
          expect(links).toEqual(expectedLinks);
        });
      });
          // Returns a promise that rejects with an error message when passed a valid file path with a non-markdown extension
    it('should reject with an error message when passed a valid file path with a non-markdown extension', () => {
      const relPath = 'valid/file/path.txt';

      return expect(getFiles(relPath)).rejects.toMatch('No es un archivo MarkDown');
    });
 });
 describe('extractLinks', () => { 
    // Should extract a link with only href and no text from the data
    it('should extract a link with only href and no text from the data', () => {
      const data = 'This is a [](https://example.com)';
      const relPath = 'example.md';

      const result = extractLinks(data, relPath);

      expect(result).toEqual([{ href: 'https://example.com', text: '', file: 'example.md' }]);
    });
        // Should return an empty array when the data does not contain any links
        it('should return an empty array when the data does not contain any links', () => {
          const data = 'This is some text without any links';
          const relPath = 'example.md';
    
          const result = extractLinks(data, relPath);
    
          expect(result).toEqual([]);
        });
 });

