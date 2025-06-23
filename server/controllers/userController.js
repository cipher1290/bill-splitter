const User = require('../models/userModel');

//fetch users 

const getUsers = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    if (user.password !== password)
      return res.status(401).json({ message: 'Invalid credentials' });

    res.status(200).json({ user, message: 'Login successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}


//create a user
const createUsers = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = new User({ name, email, password });
        await newUser.save(newUser);

        res.status(200).json({
            success: true,
            message: newUser
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// update a user
const updateUsers = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, { name, email, password }, {new : true});

        if (!updatedUser) {
            res.status(404).json({
                message: "No such user is found..."
            })
        }

        res.status(200).json({
            success: true,
            message: updatedUser
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// delete a user

const deleteUsers = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            res.json({
                message: "No such user is found..."
            })
        }

        res.status(200).json({
            success: true,
            message: deletedUser
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


module.exports = { getUsers, createUsers, updateUsers, deleteUsers};

