const express = require('express');
const fs = require('fs');

const app = express();
const databasePath = process.argv[2];

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.trim().split('\n').slice(1); // Supprimer les lignes vides et l'en-tête
      const studentsByField = {};

      lines.forEach((line) => {
        const [firstname, , , field] = line.split(',');

        if (!studentsByField[field]) {
          studentsByField[field] = {
            count: 1,
            list: [firstname],
          };
        } else {
          studentsByField[field].count += 1;
          studentsByField[field].list.push(firstname);
        }
      });

      const totalStudents = lines.length;

      const output = [`Number of students: ${totalStudents}`]; // Crée un tableau de chaînes de caractères

      for (const field in studentsByField) {
        if (Object.hasOwnProperty.call(studentsByField, field)) {
          output.push(`Number of students in ${field}: ${studentsByField[field].count}. List: ${studentsByField[field].list.join(', ')}`);
        }
      }

      resolve(output.join('\n')); // Renvoie les données sous forme de chaîne de caractères
    });
  });
}

const port = 1245;

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  countStudents(databasePath) // Appel de la fonction countStudents
    .then((data) => {
      res.end(`This is the list of our students\n${data}`);
    })
    .catch(() => {
      res.end('This is the list of our students\nCannot load the database');
    });
});

app.listen(port);

module.exports = app;
