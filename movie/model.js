const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'movie-db', 
    port: 3306,
    charset: 'utf8mb4',
});

connection.connect();

// get all function 4 mysql db
function getAll() {
    return new Promise((resolve, reject) => {
       const query = 'SELECT * FROM movies';
       connection.query(query, (error, results) => {
            if (error) {
             reject(error);
            } else {
             resolve(results);
            }
        });
    });
}

function getOne(id) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM movies WHERE id = ?';
        connection.query(query, [id], (error, results) => {
            if (error) {
                console.error(error);
                reject(error);
            } else {
                resolve(results[0]);
            }
        });
    });

}

// insert function 4 mysql db
function insert(movie) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO movies (title, year) VALUES (?, ?)';
        connection.query(query, [movie.title, movie.year], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function update(movie) {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE movies SET title = ?, year = ? WHERE id = ?';
        connection.query(query, [movie.title, movie.year, movie.id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function remove(id) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM movies WHERE id = ?';
        connection.query(query, [id], (error, results) => {
            if (error) {
                console.error(error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });

}

module.exports = {
    getAll,
    get(id) {
        return getOne(id);
    },
    delete(id) {
        return remove(id);
    },
    save(movie) {
        if (!movie.id) {
            return insert(movie);
        } else {
            return update(movie);
        }
    },
};