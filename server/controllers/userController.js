const User = require('../models/userModel');

//fetch users 

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find();

        if (!allUsers || allUsers.length === 0) {
            res.json({
                success: false,
                message: "No users in the database..."
            })
        }

        res.status(200).json({
            success: true,
            message: allUsers
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

//create a user
const createUsers = async (req, res) => {
    try {
        const { name, email } = req.body;
        const newUser = new User({ name, email });
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
    const { name, email } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, { name, email }, {new : true});

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


module.exports = { getAllUsers, createUsers, updateUsers, deleteUsers};

