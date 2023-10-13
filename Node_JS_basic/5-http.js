const http = require('http');
const fs = require('fs');

const databasePath = process.argv[2];

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.trim().split('\n').slice(1); 
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

      const output = [`Number of students: ${totalStudents}`];

      for (const field in studentsByField) {
        if (Object.hasOwnProperty.call(studentsByField, field)) {
          output.push(
            `Number of students in ${field}: ${
              studentsByField[field].count
            }. List: ${studentsByField[field].list.join(', ')}`
          );
        }
      }

      resolve(output.join('\n'));
    });
  });
}

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    countStudents(databasePath)
      .then((data) => {
        res.end(`This is the list of our students\n${data}`);
      })
      .catch(() => {
        res.end('This is the list of our students\nCannot load the database');
      });
  } else {
    res.end('Invalid URL');
  }
});

app.listen(1245);

module.exports = app;
