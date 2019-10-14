#!/usr/bin/env node
const lib = require('./index');

const [,, pathIncoming, argsUno, argsDos] = process.argv;
const options = {};
const optionsOk = [undefined, '-v', '--validate', '-s', '-stats'];
const optionsV = ['-v', '--validate'];
const optionsS = ['-s', '--stats'];

if (pathIncoming && lib.existsPath(pathIncoming)) {
  if (!optionsOk.includes(argsUno) || !optionsOk.includes(argsDos)) {
    console.log('Opciones validas: \n -v o -validate \n -s o -stats');
  } else {
    if (optionsV.includes(argsUno) || optionsV.includes(argsDos)) {
      options.validate = true;
    }
    if (optionsS.includes(argsUno) || optionsS.includes(argsDos)) {
      options.stats = true;
    }
    lib.mdLinks(lib.pathAbsolute(pathIncoming), options)
      .then((data) => console.log(data));
  }
} else {
  console.log('Ruta invalida, ingresa ruta correcta.');
}

// if (pathIncoming && lib.existsPath(args[0])) {
//   const ArrayJustMarkdown = lib.collectFiles(lib.pathAbsolute(args[0]));
//   lib.readArray(ArrayJustMarkdown);
//   // console.log('Ok');
// } else {
//   console.log('Ruta invalida, ingresa ruta correcta.');
// }
