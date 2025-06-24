const express = require('express');
const router = express.Router();
const {createGroups, getAllGroups, getSingleGroup, deleteGroups} = require('../controllers/groupController');

router.get('/groups/user/:id', getAllGroups);
router.get('/groups/:id', getSingleGroup);
router.post('/groups', createGroups);
// router.put('/groups/:id', updateGroups);
router.delete('/groups/:id/delete', deleteGroups);

module.exports = router;