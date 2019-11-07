// index.js 
// by requiring `babel/register`, all of our successive `require`s will be Babel'd
require('babel-register')({
   presets: [ 'es2015']
})

require('./server');

// https://stackoverflow.com/questions/46176973/es6-import-statements-not-working-in-node-v8-4-0?rq=1