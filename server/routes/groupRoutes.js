const express = require('express');
const router = express.Router();
const {createGroups, getAllGroups, updateGroups, deleteGroups} = require('../controllers/groupController');

router.get('/groups', getAllGroups);
router.post('/groups', createGroups);
router.put('/groups/:id', updateGroups);
router.delete('/groups/:id', deleteGroups);

module.exports = router;