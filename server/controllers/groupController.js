const Group = require('../models/groupModel');

//Create groups
const createGroups = async (req, res) =>{
    try{
        const {name, members} = req.body;
        const newGroup = new Group({name, members});
        await newGroup.save(newGroup);

        res.status(200).json({
            success : true,
            message : newGroup 
        })
    }
    catch(err){
        res.status(500).json({
            success : false,
            message : err.message
        })
    }
}

//Fetch all groups
const getAllGroups = async (req, res) =>{
    try{
        const groups = await Group.find().populate('members', 'name email');

        if(!groups || groups.length === 0)
        {
            res.status(404).json({
                success : false,
                message : "No groups in database..."
            })
        }
        
        res.status(200).json({
            success : true,
            message : groups
        })
    }
    catch(err){
        res.status(500).json({
            success : false,
            message : err.message
        })
    }
}

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

module.exports = {createGroups, getAllGroups, updateGroups, deleteGroups};