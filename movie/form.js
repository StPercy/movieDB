module.exports = function render(movie) {
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
                    <input type="hidden" name="id" value="${movie.id}" />
                    <div>
                        <label for="title">Titel:</label>
                        <input type="text" id="title" name="title" value="${movie.title}" />
                    </div>
                    <div>
                        <label for="year">Jahr:</label>
                        <input type="text" id="year" name="year" value="${movie.year}" />
                    </div>
                    <div>
                        <button type="submit">Speichern</button>
                    </div>
                </form>
            </body> 
        </html>
    `;
};