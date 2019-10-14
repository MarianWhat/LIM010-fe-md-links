const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

const existsPath = (pathN) => fs.existsSync(pathN); // Listo
const pathAbsolute = (pathN) => path.resolve(pathN); // Listo
const fileExtension = (pathN) => path.extname(pathN); // Listo

const isfileMd = (element) => { // Listo
  const pathWhat = fs.lstatSync(element);
  if (pathWhat.isFile() && (fileExtension(element) === '.md')) {
    return true;
  }
  if (pathWhat.isDirectory()) {
    return false;
  }
  return null;
};
const collectFilesMd = (ruta, arrayFilesMd = []) => { // Listo
  if (isfileMd(ruta)) {
    arrayFilesMd.push(ruta);
  }
  if (isfileMd(ruta) === false) {
    const readpath = fs.readdirSync(ruta);
    readpath.forEach((file) => {
      const newPath = `${ruta}\\${file}`;
      collectFilesMd(newPath, arrayFilesMd);
    });
  }
  return arrayFilesMd;
};
const collectLink = (data, arrayCollectLink = []) => {
  const regExpLinkMd = /((!?\[[^\]]*?\])\((https|http):\/\/(?:.)*?\))/g;
  const regExpText = /(?<=\[).+?(?=\])/g;
  const regExpLink = /(?<=\()(https|http):\/\/([\w.])(\/?.*)(?=\))/g;
  data.forEach((file) => {
    const buf = fs.readFileSync(file, 'utf8');
    const arrayRegExpLinkMd = buf.match(regExpLinkMd);
    if (arrayRegExpLinkMd !== null) {
      arrayRegExpLinkMd.forEach((linkMd) => {
        const textLinkMd = linkMd.match(regExpText) ? linkMd.match(regExpText) : [''];
        textLinkMd[0] = textLinkMd[0].length > 49 ? `${textLinkMd[0].slice(0, 47)}...` : textLinkMd[0];
        const linkLinkMd = linkMd.match(regExpLink);
        arrayCollectLink.push({ href: linkLinkMd[0], text: textLinkMd[0], file });
      });
    }
  });
  return arrayCollectLink;
};
const validateLink = (objLink) => {
  const arrayobjLink = objLink.map((link) => fetch(link.href)
    .then((response) => ({ status: response.status, statusText: response.statusText }))
    .then((obj) => ({
      ...link,
      statusText: obj.statusText,
      status: obj.status,
    }))
    .catch(() => ({
      ...link,
      statusText: 'FAIL',
      status: 'ERROR',
    })));
  return Promise.all(arrayobjLink);
};
const mdLinks = (pathIncoming, options) => new Promise((resolve) => {
  const collectLinkBase = collectLink(collectFilesMd(pathIncoming));
  if (options.validate && options.stats) {
    resolve(['-v, -s']);
  } else if (!options.validate && options.stats) {
    resolve(['-s']);
  } else if (options.validate) {
    resolve(validateLink(collectLinkBase));
  }
  resolve(collectLinkBase);
});

module.exports = {
  existsPath,
  pathAbsolute,
  fileExtension,
  isfileMd,
  collectFilesMd,
  collectLink,
  mdLinks,
};
