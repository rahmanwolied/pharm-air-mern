const express = require('express');
const router = express.Router();
const { getUsers, getUserById, deleteUserById } = require('../controllers/users.controller');

router.get('/get', getUsers);
router.get('/get/:id', getUserById);
router.delete('/delete/:id', deleteUserById);

module.exports = router;
