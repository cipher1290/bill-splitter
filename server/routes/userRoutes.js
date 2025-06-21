const express = require('express');
const router = express.Router();
const {getAllUsers, createUsers, updateUsers, deleteUsers} = require('../controllers/userController');

router.get('/users', getAllUsers);
router.post('/users', createUsers);
router.put('/users/:id', updateUsers);
router.delete('/users/:id', deleteUsers);

module.exports = router;