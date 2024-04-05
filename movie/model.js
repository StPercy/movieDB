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
      defaultValue: 'UNIX IS 4 UNIX🐱‍👤', // Standardwert für den Titel
      allowNull: false, // Titel darf nicht null sein
      validate: {
        notEmpty: {
          msg: 'Title cannot be empty'
        }
      }
    },
    year: {
      type: Sequelize.INTEGER,
      defaultValue: new Date().getFullYear(), // Standardwert für das Jahr
      allowNull: false, // Jahr darf nicht null sein
      validate: {
        isInt: {
          msg: 'Year must be an integer'
        },
        min: {
          args: [1900], // Beispiel: Mindestwert für das Jahr
          msg: 'Year must be greater than or equal to 1900'
        },
        max: {
          args: [new Date().getFullYear()], // Beispiel: Aktuelles Jahr
          msg: 'Year must be less than or equal to current year'
        }
      }
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
    // Konvertiere die Werte in die erwarteten Typen
    const id = movie.id ? parseInt(movie.id) : null; // Konvertiere die ID in eine Zahl oder behalte sie null
    const title = String(movie.title).trim(); // Entferne führende und abschließende Leerzeichen
    const year = movie.year ? parseInt(movie.year) : null; // Konvertiere das Jahr in eine Zahl oder behalte es null

    // Führe Validierungen durch
    return Movies.create({ title, year })
      .then(createdMovie => {
        // Rückgabe des erstellten Films oder Fehler, falls die Validierung fehlschlägt
        return createdMovie;
      })
      .catch(error => {
        // Behandle Validierungsfehler und gebe entsprechende Fehlermeldungen zurück
        if (error.name === 'SequelizeValidationError') {
          const errors = error.errors.map(err => err.message);
          return Promise.reject(errors);
        }
        return Promise.reject(error);
      });
  }
};
