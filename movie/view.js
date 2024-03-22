module.exports = function render(movies) {
    return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Movie List</title>
                <link rel="stylesheet" href="style.css">
                </head>
            <body>
                <h1>Movie List</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Year</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        ${movies.map(movie => `
                            <tr>
                                <td>${movie.id}</td>
                                <td>${movie.title}</td>
                                <td>${movie.year}</td>
                                <td><a href="/movie/delete/${movie.id}">DELETE</a></td>
                                <td><a href="/movie/form/${movie.id}">EDIT</a></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <a href="/movie/form">Add Movie</a>
            </body>
        </html>
    `;
};