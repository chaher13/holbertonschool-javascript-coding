import express from 'express';
import AppController from '../controllers/AppController';
import StudentController from '../controllers/StudentsController';

const router = express.Router();

router.get('/', (req, res) => {
  AppController.getHomepage(req, res);
});

router.get('/students', (req, res) => {
  StudentController.getAllStudents(req, res, process.argv[2]);
});

router.get('/students/:major', (req, res) => {
  StudentController.getAllStudentsByMajor(req, res, process.argv[2]);
});

export default router;
