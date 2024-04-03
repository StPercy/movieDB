const model = require('./model');
const view = require('./view');
const form = require('./form');

function listAction(req, res) {
    model.getAll().then(
        movies => {
            res.render(__dirname + '/views/list', { movies });
        },
        error => res.send(error),
    );
}

function deleteAction(req, res) {
    const id = parseInt(req.params.id, 10);
    model.delete(id).then(
        () => res.redirect(req.baseUrl),
        error => res.send(error),
        );            
}

function formAction(req,res) {
   let movie = { id: '', title: '', year: '' };
    if (req.params.id) {
        model
            .get(parseInt(req.params.id, 10))
            .then(movie => res.send(form(movie)), 
            error => res.send(error));
    } else {
        const body = form(movie);
        res.send(body);
    }
}

// save action 4 mysql db    
function saveAction(req, res) {
    const movie = {
        id: req.body.id,
        title: req.body.title,
        year: req.body.year,
    };
    model.save(movie).then(
        () => {
            res.redirect(req.baseUrl);
        },
        error => {
            res.send(error);
        }
    );
}


module.exports = {
    listAction,
    deleteAction,
    formAction,
    saveAction,
};

