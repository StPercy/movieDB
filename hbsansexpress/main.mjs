import http from 'http';
import fs from 'fs';
import hbs from 'handlebars';

http.createServer((req, res) => {
    fs.readFile( './templates/index.hbs', 'utf-8', (err, data) => {
        const template = hbs.compile(data);
        const result = template({ name: 'John Doe 👮‍♂️' });
        res.end(result);
    });

}).listen(9494, () => {
    console.log('Server started on http://localhost:9494 🙊');
});