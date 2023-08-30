const { mdLinks } = require('./index');

mdLinks("./faby.md").then(() => {})
.catch((error) => {console.log(error)});
