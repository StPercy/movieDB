const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'movie.db'
});

const Movies = sequelize.define(
  'Movies',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      defaultValue: 'UNIX IS 4 UNIX 🐱‍👤',
    },
    year: {
      type: Sequelize.INTEGER,
      defaultValue: 1970,
    },
  },
  { timestamps: false }
);

module.exports = {
  getAll() {
    return Movies.findAll();
  },
  get(id) {
    return Movies.findByPk(id);
  },
  delete(id) {
    return Movies.destroy({ where: { id } });
  },
  save(movie) {
    // Logge die empfangenen Daten um den Typ zu überprüfen:
    console.log("Received movie object:", movie);
    console.log("Type of id:", typeof movie.id);
    console.log("Type of title:", typeof movie.title);
    console.log("Type of year:", typeof movie.year);
    
    // Konvertiere die Werte in die erwarteten Typen
    const id = movie.id ? parseInt(movie.id) : null; // Konvertiere die ID in eine Zahl oder behalte sie null
    const title = movie.title ? String(movie.title) : movie.title.defaultValue; // Verwende den Standardwert für den Titel, wenn keiner angegeben ist
    const year = movie.year ? parseInt(movie.year) : movie.year.defaultValue; // Konvertiere das Jahr in eine Zahl oder behalte es null

    if (id) {
        return Movies.upsert({ id, title, year }); // upsert() ersetzt den Datensatz, wenn er existiert, oder fügt ihn ein, wenn er nicht existiert
    } else {
        return Movies.create({ title, year }); // create() fügt einen neuen Datensatz hinzu
    }
}


}
