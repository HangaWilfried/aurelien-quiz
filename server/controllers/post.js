const mongoose = require("mongoose");
const schema = mongoose.Schema;
const score = schema({
    value: {
        type: Number
    }
})
const userSchema = new schema({
  username: String,
  firstname: String,
  lastname: String,
  scores: [score],
  created: {
    type: Date,
    default: Date.now
  }
})

const User = mongoose.model("Users", userSchema)

module.exports = class API {

    static async fetchAllUsers(req, res) {
        try {
            const user = await User.find();
            res.status(200).json(user)
        }catch (err){
            res.status(404).json({ message: err.message })
        }
    }

    static async fetchUserById(req, res) {
        try {
            const user = await User.findOne({ username: req.params.id });
            res.status(200).json(user)
        }catch (err){
            res.status(404).json({ message: err.message })
        }
    }

    static async createUser(req, res) {
        try {
            const searchUser = await User.findOne(req.body)
            
            if(searchUser === null) {
                const userToAdd = new User(req.body)
                userToAdd.save();      
                res.status(201).json({ id: userToAdd._id })
            } 
            else {
                res.status(409).json({message: 'user already exist'});
            }
        }catch (err){
            res.status(400).json({ message: err.message })
        }
    }

    static async updateScore(req, res) {
        try {
            const newUpdate = await User.findById(req.params.id);  
            newUpdate.scores.push(...req.body.scores)  
            newUpdate.save()
            res.status(202).json({ id: newUpdate._id })
        }
        catch (err){
            res.status(400).json({ message: err.message })
        }
    }
}
