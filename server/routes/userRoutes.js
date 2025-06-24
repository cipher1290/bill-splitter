const express = require('express');
const router = express.Router();
const {getUsers, createUsers, deleteUsers} = require('../controllers/userController');

router.post('/users/login', getUsers);
router.post('/users/register', createUsers);
// router.put('/users/:id', updateUsers);
router.delete('/users/:id', deleteUsers);

module.exports = router;