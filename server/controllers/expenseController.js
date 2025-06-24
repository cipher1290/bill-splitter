const Expense = require('../models/expenseModel');
const Payment = require('../models/paymentModel');
const Group = require('../models/groupModel');
//Create groups
const createExpenses = async (req, res) => {
  try {
    const { description, group, amount, paidBy, splits } = req.body;

    if (!description || !group || !amount || !paidBy || !splits || !Array.isArray(splits) || splits.length === 0) {
      return res.status(400).json({
        success: false,
        message: "All fields including non-empty splits are required."
      });
    }

    for (let split of splits) {
      if (!split.user || typeof split.amount !== "number") {
        return res.status(400).json({
          success: false,
          message: "Each split must have a user and a numeric amount."
        });
      }
    }

    const newExpense = new Expense({ description, group, amount, paidBy, splits });
    await newExpense.save();

    await Group.findByIdAndUpdate(group, {
      $push: { expenses: newExpense._id }
    });

    res.status(200).json({
      success: true,
      message: newExpense
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};




//Fetch particular group expenses
const getAllExpenses = async (req, res) =>{
    const {id} = req.params;
    try{
        const expenses = await Expense.find({group : id}).populate('group', 'name').populate('paidBy', 'name').populate('splits.user', 'name');

        if(!expenses || expenses.length === 0)
        {
            res.status(404).json({
                success : false,
                message : "No expenses in database..."
            })
        }
        
        res.status(200).json({
            success : true,
            message : expenses
        })
    }
    catch(err){
        res.status(500).json({
            success : false,
            message : err.message
        })
    }
}

const getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id)
      .populate('group')
      .populate('paidBy', 'name')
      .populate('splits.user', 'name');

    if (!expense) {
      return res.status(404).json({ success: false, message: 'Expense not found' });
    }

    res.status(200).json({ success: true, expense });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

//update expenses
// const updateExpenses = async (req, res) =>{
//     const {id} = req.params;
//     const{description, group, amount, paidBy, splits} = req.body;
//     try{
//         const updatedExpense = await Expense.findByIdAndUpdate(id, {description, group, amount, paidBy, splits}, {new : true}).populate('paidBy', 'name').populate('splits.user', 'name');

//         if(!updatedExpense || updatedExpense.length === 0)
//         {
//             res.status(404).json({
//                 success : false,
//                 message : "No such expense found..."
//             })
//         }

//         res.status(200).json({
//             success : true,
//             message : updatedExpense
//         })
//     }
//     catch(err){
//         res.status(500).json({
//             success : false,
//             message : err.message
//         })
//     }
// }

//delete an expense
const deleteExpenses = async (req, res) =>{
    const {id} = req.params;
    try{
        const deletedExpense = await Expense.findByIdAndDelete(id);

        if(!deletedExpense || deletedExpense.length === 0)
        {
            res.status(404).json({
                success : false,
                message : "No such expense found..."
            })
        }

        res.status(200).json({
            success : true,
            message : deletedExpense
        })
    }
    catch(err){
        res.status(500).json({
            success : false,
            message : err.message
        })
    }
}

//calculation logic
// const calculateCustomBalances = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const expenses = await Expense.find({ group: id })
//             .populate('paidBy', 'name _id')
//             .populate('splits.user', 'name _id');

//         const balances = {};

//         expenses.forEach(exp => {
//             const paidById = exp.paidBy._id.toString();
//             const paidByName = exp.paidBy.name;

//             exp.splits.forEach(split => {
//                 const userId = split.user._id.toString();
//                 const userName = split.user.name;
//                 const owed = split.amount;

//                 if (userId !== paidById) {
//                     const key = `${userName}->${paidByName}`;
//                     if (!balances[key]) balances[key] = 0;
//                     balances[key] += owed;
//                 }
//             });
//         });

//         const formatted = Object.entries(balances).map(([key, amount]) => {
//             const [from, to] = key.split('->');
//             return {
//                 from,
//                 to,
//                 amount: Math.round(amount * 100) / 100
//             };
//         });

//         res.status(200).json({ balances: formatted });
//     } catch (err) {
//         res.status(500).json({ success: false, message: err.message });
//     }
// };

// getting group summary
// const getGroupSummary = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const expenses = await Expense.find({ group: id })
//       .populate('paidBy', 'name')
//       .populate('splits.user', 'name');

//     const payments = await Payment.find({ group: id })
//       .populate('from', 'name')
//       .populate('to', 'name');

//     const userSummary = {}; // userId -> { name, paid, owed }

//     // Step 1: Calculate total paid and owed from expenses
//     expenses.forEach(exp => {
//       const paidBy = exp.paidBy._id.toString();
//       const paidByName = exp.paidBy.name;

//       if (!userSummary[paidBy]) {
//         userSummary[paidBy] = { name: paidByName, paid: 0, owed: 0 };
//       }
//       userSummary[paidBy].paid += exp.amount;

//       exp.splits.forEach(split => {
//         const userId = split.user._id.toString();
//         const userName = split.user.name;

//         if (!userSummary[userId]) {
//           userSummary[userId] = { name: userName, paid: 0, owed: 0 };
//         }
//         userSummary[userId].owed += split.amount;
//       });
//     });

//     // Step 2: Subtract payments
//     payments.forEach(pay => {
//       const from = pay.from._id.toString();
//       const fromName = pay.from.name;
//       const to = pay.to._id.toString();
//       const toName = pay.to.name;
//       const amt = pay.amount;

//       if (!userSummary[from]) {
//         userSummary[from] = { name: fromName, paid: 0, owed: 0 };
//       }
//       userSummary[from].paid += amt;

//       if (!userSummary[to]) {
//         userSummary[to] = { name: toName, paid: 0, owed: 0 };
//       }
//       userSummary[to].paid -= amt;
//     });

//     const summary = Object.values(userSummary).map(val => ({
//       name: val.name,
//       paid: Math.round(val.paid * 100) / 100,
//       owed: Math.round(val.owed * 100) / 100,
//       balance: Math.round((val.paid - val.owed) * 100) / 100
//     }));

//     res.status(200).json({ success: true, message : summary });

//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

const getExpenseBreakdown = async (req, res) => {
  try {
    const { id } = req.params; // expenseId

    const expense = await Expense.findById(id)
      .populate('paidBy', 'name _id')
      .populate('splits.user', 'name _id');

    if (!expense) {
      return res.status(404).json({ success: false, message: 'Expense not found' });
    }

    // Get all payments for this expense's group
    const payments = await Payment.find({ group: expense.group })
      .populate('from', 'name _id')
      .populate('to', 'name _id');

    const breakdown = [];

    const payer = expense.paidBy;

    for (let split of expense.splits) {
      const user = split.user;
      const owedAmount = split.amount;

      if (user._id.toString() === payer._id.toString()) continue;

      // Find payments from this user to the payer
      const matchingPayments = payments.filter(
        p => p.from._id.toString() === user._id.toString() &&
             p.to._id.toString() === payer._id.toString()
      );

      const totalPaid = matchingPayments.reduce((sum, p) => sum + p.amount, 0);
      const remaining = Math.max(owedAmount - totalPaid, 0).toFixed(2);

      breakdown.push({
        from: user.name,
        to: payer.name,
        amountOwed: owedAmount.toFixed(2),
        amountPaid: totalPaid.toFixed(2),
        remaining
      });
    }

    res.status(200).json({ success: true, message: breakdown });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};




module.exports = {createExpenses, getAllExpenses, updateExpenses, deleteExpenses, calculateCustomBalances, getExpenseBreakdown, getExpenseById};