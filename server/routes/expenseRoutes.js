const express = require('express');
const router = express.Router();
const {createExpenses, getAllExpenses, updateExpenses, deleteExpenses, calculateCustomBalances, getGroupSummary} = require('../controllers/expenseController');

router.get('/expenses/:id', getAllExpenses);
router.post('/expenses', createExpenses);
router.put('/expenses/:id', updateExpenses);
router.delete('/expenses/:id', deleteExpenses);
router.get('/groups/:id/balances', calculateCustomBalances);
router.get('/groups/:id/summary', getGroupSummary);


module.exports = router;