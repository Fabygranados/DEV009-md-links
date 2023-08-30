const { mdLinks } = require ('../index.js');

describe('mdLinks', () => {
  it('should...', () => {
    console.log('Hello Faby!!');
  });
  // it('Deberia devolver una promesa', () => {
  //   expect(mdLinks()).toBe(typeof Promise);
  // });
  it('Deberia rechazar cuando la ruta no existe', () => {
    return mdLinks('/documents/cursos/faby.md').catch((error) => {
      expect(error).toBe("La ruta no existe");
    });
  })
});