const Group = require('../models/groupModel');
const User = require('../models/userModel');


//Create groups
const createGroups = async (req, res) => {
  try {
    const { name, members } = req.body;

    const userIds = [];

    for (const m of members) {
      let user = await User.findOne({ email: m.email });

      if (!user) {
        user = new User({
          name: m.name,
          email: m.email,
          // password not required
        });
        await user.save();
      }

      userIds.push(user._id);
    }

    const group = new Group({ name, members: userIds });
    await group.save();

    res.status(201).json({ message: 'Group created', group });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


//Fetch all groups
const getAllGroups = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required',
      });
    }

    const groups = await Group.find({ members: id }).populate('members', 'name email');

    if (!groups || groups.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No groups found for this user.',
      });
    }

    res.status(200).json({
      success: true,
      groups,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//Fetch single group
const getSingleGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id)
      .populate('members', 'name email')
      .populate({
        path: 'expenses',
        populate: { path: 'paidBy', select: 'name' }
      })
      .populate({
        path: 'payments',
        populate: [
          { path: 'from', select: 'name' },
          { path: 'to', select: 'name' }
        ]
      });

    if (!group) {
      return res.status(404).json({ success: false, message: 'Group not found' });
    }

    res.status(200).json({ success: true, group });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



//update groups
const updateGroups = async (req, res) =>{
    const {id} = req.params;
    const{name, members} = req.body;
    try{
        const updatedGroup = await Group.findByIdAndUpdate(id, {name, members}, {new : true});

        if(!updatedGroup || updatedGroup.length === 0)
        {
            res.status(404).json({
                success : false,
                message : "No such group found..."
            })
        }

        res.status(200).json({
            success : true,
            message : updatedGroup
        })
    }
    catch(err){
        res.status(500).json({
            success : false,
            message : err.message
        })
    }
}

//delete a group
const deleteGroups = async (req, res) =>{
    const {id} = req.params;
    try{
        const deletedGroup = await Group.findByIdAndDelete(id);

        if(!deletedGroup || deletedGroup.length === 0)
        {
            res.status(404).json({
                success : false,
                message : "No such group found..."
            })
        }

        res.status(200).json({
            success : true,
            message : deletedGroup
        })
    }
    catch(err){
        res.status(500).json({
            success : false,
            message : err.message
        })
    }
}

module.exports = {createGroups, getAllGroups, getSingleGroup, updateGroups, deleteGroups};