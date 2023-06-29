import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// the example code that we got from the notes uses require
// however, i have the project package.json set to "type": "module"
// this means that we use import, instead of require, for most things
// and using require normally causes the app to crash
// bcrypt, however, needs require
// the 2 lines on top is what we need to create the require function to use bcrypt

const bcrypt = require('bcrypt');
bcrypt.hash('example', 3).then(console.log)