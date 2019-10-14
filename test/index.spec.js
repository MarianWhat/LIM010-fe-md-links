const lib = require('../src/index');

// const noPath = '';
const fielMd = 'test\\to-test\\file.md';
const pathAbsoluteFielMd = 'C:\\Users\\L-14\\Desktop\\Dev\\LIM010-fe-md-links\\test\\to-test\\file.md';
const pathAbsoluteFielNoMd = 'C:\\Users\\L-14\\Desktop\\Dev\\LIM010-fe-md-links\\test\\to-test\\file.txt';
const pathAbsolute = 'C:\\Users\\L-14\\Desktop\\Dev\\LIM010-fe-md-links\\test\\to-test';
const collectFilesMd = ['C:\\Users\\L-14\\Desktop\\Dev\\LIM010-fe-md-links\\test\\to-test\\file.md', 'C:\\Users\\L-14\\Desktop\\Dev\\LIM010-fe-md-links\\test\\to-test\\fileNoLink.md'];
// const arrayObjeto = [{
//   href:
//   'https://es.wikipedia.org/wiki/Modelo%E2%80%93vista%E2%80%93controlador',
//   text: 'MVC',
//   file:
//   'C:\\Users\\L-14\\Desktop\\Dev\\LIM010-fe-md-links\\test\\to-test\\file.md',
// },
// {
//   href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/import',
//   file: 'C:\\Users\\L-14\\Desktop\\Dev\\LIM010-fe-md-links\\test\\to-test\\file.md',
//   text: 'Diseñar la arquitectura de tu aplicación, modul...',
// },
// ];

describe('Prueba', () => {
  it('Debe pasar si la ruta existe', () => {
    expect(lib.existsPath(fielMd)).toBe(true);
  });
  it('Debe pasar si devuelve una rura absoluta', () => {
    expect(lib.pathAbsolute(fielMd)).toBe(pathAbsoluteFielMd);
  });
  it('Debe pasar si el archivo es .md', () => {
    expect(lib.fileExtension(pathAbsoluteFielMd)).toBe('.md');
  });
  it('Debe pasar si es un archivo y si es .md', () => {
    expect(lib.isfileMd(pathAbsoluteFielMd)).toBe(true);
  });
  it('Debe pasar NULL', () => {
    expect(lib.isfileMd(pathAbsoluteFielNoMd)).toBe(null);
  });
  it('Debe pasar si retorna el resultado esperado', () => {
    expect(lib.collectFilesMd(pathAbsolute)).toEqual(collectFilesMd);
  });
  // it('Debe pasar si retorna el resultado esperado', () => {
  //   expect(lib.readArray(collectFilesMd)).toEqual(arrayObjeto);
  // });
  it('Debe pasar si retorna el resultado esperado', () => {
    // expect(lib.collectLink(collectFilesMd)).toBe([]);
    console.log(lib.collectLink(collectFilesMd));
  });
});


// const fetchMock = require('node-fetch');

// fetchMock
//   .mock('http://www.yes.com', 200)
//   .mock('http://www.no.it', 400)
//   .mock('Not url', () => {
//     throw 'error';
//   });
