const fs = require('fs');
const path = require('path');
resolve = require('path').resolve; 
const fetch = require('node-fetch');


const arrayFilesMd = [];
const arraymdLinks = [];


const fileOrDirectory = (element) => {
	return new Promise((resolve, reject) => {
    fs.stat(element, (err, stats) => {
        if (err && err.code === 'ENOENT') {
					reject(err.code);           
        } else if (err) {
					reject(err);         
        }
        if (stats.isFile() & (stats === '.md')) {
				arrayFilesMd.push(element);
				resolve(arrayFilesMd);	
        }
        if (stats.isDirectory()) {
					resolve(collectFiles(element));
        }
			});
    });
			
};
const collectFiles = (ruta) => {
	return new Promise((resolve, reject) => {
	fs.readdir(ruta, (err, contents) => {
		if (err) {
			reject('Un error', err);
		}
		contents.forEach((file) => {
			const newPath = ruta + '\\' + file;				

			const dirOArc = path.extname(newPath);
			if (dirOArc === '.md') {
				arrayFilesMd.push(newPath);	
			}
			if (dirOArc === '') {
				fileOrDirectory(newPath);
			}
		});
	});
	setTimeout(() => {
	resolve(arrayFilesMd);
  }, 100);
});
};
const mdLinks = (pathMd) => {

}
const validateLink= (link) => {
	fetch(link)
	.then((response) => {
		response.ok ? console.log(response.statusText): 'Fail';
	  })
	  .catch(() => console.log('Fail'));
};
const readArray = (array) => {
	array.forEach((file) => {
	const buf = fs.readFileSync(file, "utf8");
	const regExpLinkMd = /((!?\[[^\]]*?\])\((https|http)\:\/\/(?:.)*?\))/g; 
	const regExpText = /(?<=\[).+?(?=\])/g;
	const regExpLink = /(?<=\()(https|http)\:\/\/([\w\.])(\/?.*)(?=\))/g;
	const myArray = buf.match(regExpLinkMd);
		if (myArray !==null) {
			myArray.forEach((element) => {
				const textLinkMd = element.match(regExpText);
				textLinkMd[0] = textLinkMd[0].length > 49 ? textLinkMd[0].slice(0, 47) + '...' : textLinkMd[0];
				const linkLinkMd = element.match(regExpLink);
				console.log(file, '|', textLinkMd[0], '\x1b[36m', linkLinkMd[0], '\x1b[0m');
				validateLink(linkLinkMd[0]);
			});			
		} 
	});
};

process.argv[2] ? fileOrDirectory(resolve(process.argv[2])).then((ArrayJustMarkdown) => readArray(ArrayJustMarkdown)) : console.log('Ingresa al menos una ruta.');





// const mdLinks = require("md-links");

// mdLinks("./some/example.md")
//   .then(links => {
//     // => [{ href, text, file }]
//   })
//   .catch(console.error);

// mdLinks("./some/example.md", { validate: true })
//   .then(links => {
//     // => [{ href, text, file, status, ok }]
//   })
//   .catch(console.error);

// mdLinks("./some/dir")
//   .then(links => {
//     // => [{ href, text, file }]
//   })
//   .catch(console.error);