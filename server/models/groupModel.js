const {Schema, model} = require("mongoose");

const GroupSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please enter group name'],
  },

  members : [{
    type : 'ObjectId',
    ref : 'User'
  }],

    expenses: [
    {
      type: 'ObjectId',
      ref: 'Expense', // ✅ should match your Expense model name
    },
  ],
  payments: [
    {
      type: 'ObjectId',
      ref: 'Payment', // ✅ should match your Payment model name
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const GroupModel = model("Group", GroupSchema)

module.exports = GroupModel;