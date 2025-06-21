const {Schema, model} = require("mongoose");

const ExpenseSchema = new Schema({
  description : {
    type : String,
    required : [true, 'Please enter the description of the expense'],
    trim : true
  },

  group : {
    type : 'ObjectId',
    ref : 'Group',
    required : [true, 'Please enter a group name']
  },

  amount : {
    type : Number,
    required : [true, 'Please enter the total amount'],
    min : 1
  },

  paidBy : {
    type : 'ObjectId',
    required : [true, 'Please enter a member name'],
    ref : 'User'
  },

  splits : [{
    user : {
        type : 'ObjectId',
        ref : 'User',
        required : [true, 'Please enter a member name']
    },
    
    amount : {
        type : Number,
        required : [true, 'Please enter the split amount']
    }
  }],

  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const ExpenseModel = model("Expense", ExpenseSchema)

module.exports = ExpenseModel;