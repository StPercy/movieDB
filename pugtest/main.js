const http = require('http');
const pug = require('pug');

const fn = pug.compileFile('templates/compile.pug');

http
    .createServer((req, res) => {
        let output = fn({ name: 'Timothy ' });
        //output = fn({ name: 'Steve ' });

        res.end(output);
    })
    .listen(9999, () => console.log('Server running on http://localhost:9999/ 🏁'));