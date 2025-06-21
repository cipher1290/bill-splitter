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

  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const GroupModel = model("Group", GroupSchema)

module.exports = GroupModel;