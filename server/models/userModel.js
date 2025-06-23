const {Schema, model} = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
  },

  email : {
    type : String,
    required: [true, 'Please enter an email'],
    unique : true,
    match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please enter a valid email'
        ]
  },

  password : {
    type : String,
    required: [false, 'Please enter a password']
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const UserModel = model("User", UserSchema)

module.exports = UserModel;