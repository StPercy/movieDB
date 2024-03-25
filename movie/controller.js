const model = require('./model');
const view = require('./view');
const form = require('./form');

function listAction(req, res) {
    const movies = model.getAll();
    res.render(__dirname + '/views/list', { movies: movies }); // 1st Param: Name of Pug-Templates,2nd Param: an Object with data to be passed to the template
    console.log('MVC implemented in my first MVC structureed APP 📀❤🎮');
}

function deleteAction(req, res) {
    const id = parseInt(req.params.id, 10);
    model.delete(id);
    res.redirect('/movie');
}

function formAction(req,res) {
    let movie = { id: '', title: '', year: '' };
    if (req.params.id) {
        movie = model.get(parseInt(req.params.id, 10)); 
    }

    const body = form(movie);
    res.send(body);
}

function saveAction(req, res) {
    const movie = {
        id: req.body.id,
        title: req.body.title,
        year: req.body.year,
    };
    console.log(movie); // Füge eine Konsolenausgabe hinzu, um das 'movie'-Objekt zu überprüfen
    model.save(movie);
    res.redirect('/movie');
}


module.exports = {
    listAction,
    deleteAction,
    formAction,
    saveAction,
};

