const mdLinks = require ('./index.js');

describe('mdLinks', () => {
  it('should...', () => {
    console.log('Hello Faby!!');
  });
  it('Deberia devolver una promesa', () => {
    expect(mdLinks()).toBe(typeof Promise);
  });
});
