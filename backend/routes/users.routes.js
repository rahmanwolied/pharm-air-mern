const express = require('express');
const router = express.Router();
const { getUsers, getUserById, deleteUserById } = require('../controllers/users.controller');
const { isLoggedIn, isAdmin } = require('../middlewares/auth');

router.get('/get', isLoggedIn, isAdmin, getUsers);
router.get('/get/:id', isLoggedIn, getUserById);
router.delete('/delete/:id', deleteUserById);

module.exports = router;
