const express = require('express');
const router = express.Router();
const {getExpenseById, createExpenses, getAllExpenses, deleteExpenses, getExpenseBreakdown} = require('../controllers/expenseController');

router.get('/expenses/:id', getAllExpenses);
router.get('/expenses/:id/getExpense', getExpenseById);
router.post('/expenses', createExpenses);
// router.put('/expenses/:id/update', updateExpenses);
router.delete('/expenses/:id/delete', deleteExpenses);
// router.get('/groups/:id/balances', calculateCustomBalances);
router.get('/expenses/:id/breakdown', getExpenseBreakdown);


module.exports = router;