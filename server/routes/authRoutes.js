const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rutas públicas
router.post('/register', authController.register);
router.post('/login', authController.login);

// Rutas protegidas
router.get('/verify', authController.verifyToken);
router.get('/pending', authController.getPendingUsers);
router.post('/approve', authController.approveUser);
router.post('/reject', authController.rejectUser);
router.get('/users', authController.getUsers);

module.exports = router;