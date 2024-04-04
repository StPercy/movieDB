module.exports = function render(movie) {
    const movieId = movie ? movie.id : '';
    const movieTitle = movie ? movie.title : '';
    const movieYear = movie ? movie.year : '';
    
    return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Movie Form</title>
                <link rel="stylesheet" href="style.css">
            </head>
            <body>
               <form action="/movie/save" method="post">
                    <input type="hidden" name="id" value="${movieId}" />
                    <div>
                        <label for="title">Titel:</label>
                        <input type="text" id="title" name="title" value="${movieTitle}" />
                    </div>
                    <div>
                        <label for="year">Jahr:</label>
                        <input type="text" id="year" name="year" value="${movieYear}" />
                    </div>
                    <div>
                        <button type="submit">Speichern</button>
                    </div>
                </form>
            </body> 
        </html>
    `;
};
