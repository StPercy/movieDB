let data = [
    {id : 1, title : 'The Shawshank Redemption 🏭', year : '1994'},
    {id : 2, title : 'The Godfather 🤠', year : '1972'},
    {id : 3, title : 'The Godfather: Part II 👮‍♂️', year : '1974'},
    {id : 4, title : 'The Dark Knight 🤖', year : '2008'},
    {id : 5, title : 'Batman Begins 🦇', year : '2005'},
    {id: 6, title: 'Spaceballs🛸', year: '1987'},
    {id: 7, title: 'The Matrix 💻', year: '1999'},
    {id: 8, title: 'The Matrix Reloaded 💱', year: '2003'},
    {id: 9, title: 'The Matrix Revolutions ⬛', year: '2003'},
    {id: 10, title: 'The Dark Knight Rises 🐱‍👤', year: '2012'},
];

function getNextId() {
    return Math.max(...data.map((movie) => movie.id)) + 1;
  }
  
  function insert(movie) {
    movie.id = getNextId();
    data.push(movie);
  }
  
  function update(movie) {
    movie.id = parseInt(movie.id, 10);
    const index = data.findIndex((item) => item.id === movie.id);
    data[index] = movie;
  }
  
  export function getAll() {
    return Promise.resolve(data);
  }
  
  export function get(id) {
    return Promise.resolve(data.find((movie) => movie.id === id));
  }
  
  export function remove(id) {
    data = data.filter((movie) => movie.id !== id);
    return Promise.resolve();
  }
  
  export function save(movie) {
    movie.id === '' ? insert(movie) : update(movie);
    return Promise.resolve();
  }