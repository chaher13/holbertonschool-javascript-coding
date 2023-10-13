const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');
    const lines = data.split('\n').filter((line) => line.trim() !== '');

    let index = 1; // Commencez à partir de la deuxième ligne (l'indice 1)
    const totalStudents = lines.length - 1; // Soustrayez 1 pour exclure l'en-tête
    const studentsByField = {};

    while (index < lines.length) {
      const [firstname, , , field] = lines[index].split(',');

      if (field in studentsByField) {
        studentsByField[field].count += 1;
        studentsByField[field].list.push(firstname);
      } else {
        studentsByField[field] = {
          count: 1,
          list: [firstname],
        };
      }

      index += 1;
    }

    console.log(`Number of students: ${totalStudents}`);

    for (const field in studentsByField) {
      if (Object.prototype.hasOwnProperty.call(studentsByField, field)) {
        console.log(`Number of students in ${field}: ${studentsByField[field].count}. List: ${studentsByField[field].list.join(', ')}`);
      }
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
