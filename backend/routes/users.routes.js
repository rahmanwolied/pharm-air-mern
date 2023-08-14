const express = require('express');
const router = express.Router();
const { getUsers, getUserById, deleteUserById } = require('../controllers/users.controller');
const { isLoggedIn } = require('../middlewares/auth');

router.get('/get', getUsers);
router.get('/get/:id', isLoggedIn, getUserById);
router.delete('/delete/:id', deleteUserById);

module.exports = router;
