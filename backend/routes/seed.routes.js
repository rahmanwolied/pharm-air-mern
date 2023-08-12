const express = require('express');
const { seedUser } = require('../controllers/seedUsers.controller');
const router = express.Router();

router.get('/users', seedUser);
router.get('/users/:count', seedUser);

module.exports = router;
