const express = require('express');
const countStudents = require('./3-read_file_async');

const app = express();
const port = 1245
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  res.write('This is the list of our students\n');
  try {
    const students = await countStudents(process.argv[2]);
    res.end(students.join('\n'));
    res.statusCode = 200;
    res.end();
  } catch (error) {
    res.statusCode = 500;
    res.end(error.message);
  }
});

app.listen(port);

module.exports = app;
