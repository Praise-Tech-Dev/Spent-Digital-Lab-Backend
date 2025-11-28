const mongoose = require("mongoose");
const {v4: uuidv4} = require('uuid');

const UsersSchema= new mongoose.Schema({
_id: {
type: String,
default: uuidv4,
},
firstName: {
    type: String,
    required: false,
},
lastName: {
    type: String,
    required: false,
},
email: {
    type: String,
    required: true,
    unique: true,
    index: true,
},
passwordHash: {
    type: String,
    required: true,
},
role: {
    type: String,
    enum: ['admin', 'user', 'researcher', 'editor' ] ,
    default: 'user',
},
phoneNo: {
    type: String,
    required: false,
},
avatarUrl: {
    type: String,
    required: false, 
},
avatarPublicId: {
    type: String,
    required: false,
},
status : {
    type: String,
    enum: ['approved', 'pending', 'banned'],
    default: 'pending',
}
}, {_id: false, timestamps: true})

module.exports = mongoose.model("Users", UsersSchema);