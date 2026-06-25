const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');

// Публичная регистрация отключена — учётная запись администратора
// создаётся через сидер (см. npm run seed:admin) или напрямую в БД.
router.post('/login', login);

module.exports = router;
