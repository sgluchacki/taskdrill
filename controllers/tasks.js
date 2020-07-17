const Task = require('../models/task');

module.exports = {
    index,
    create,
    update,
    delete: deleteOne,
};

// index
async function index(req, res) {
    try{
        const tasks = await Task.find({user: req.user._id}).populate('user');
        res.status(200).json(tasks);
        console.log('hey, check it out! you got yourself some tasks!')
    }
    catch(err){
        res.status(500).json(err);
    }
}

// create
async function create(req, res) {
    req.body.user = req.user._id;
    try{
        const task = await Task.create(req.body);
        console.log(task ,'<==========task')
        res.status(201).json(task);
    }
    catch(err){
        res.status(500).json(err);
    }
}

// update
async function update(req, res) {
    try{
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json(updatedTask);
    }
    catch(err){
        res.status(500).json(err);
    }
}

// delete
async function deleteOne(req, res) {
    try{
        const deletedTask = await Task.findByIdAndRemove(req.params.id);
        res.status(200).json(deletedTask);
    }
    catch(err){
        res.status(500).json(err);
    }
}