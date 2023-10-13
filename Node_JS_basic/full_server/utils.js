// full_server/utils.js

const fs = require('fs');

function readDatabase(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(Error(err));
      } else {
        const lines = data.trim().split('\n');
        lines.shift(); // Supprimer l'en-tête

        const studentsByField = {};

        for (const line of lines) {
          const [firstname, , , field] = line.split(',');

          if (!studentsByField[field]) {
            studentsByField[field] = [firstname];
          } else {
            studentsByField[field].push(firstname);
          }
        }

        resolve(studentsByField);
      }
    });
  });
}

export default readDatabase;
