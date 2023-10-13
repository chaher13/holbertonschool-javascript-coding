const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.trim().split('\n').slice(1);

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

      console.log(`Number of students: ${totalStudents}`);

      for (const field in studentsByField) {
        if (Object.hasOwnProperty.call(studentsByField, field)) {
          console.log(
            `Number of students in ${field}: ${
              studentsByField[field].count
            }. List: ${studentsByField[field].list.join(', ')}`
          );
        }
      }

      resolve();
    });
  });
}

module.exports = countStudents;
