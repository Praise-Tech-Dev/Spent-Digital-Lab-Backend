const User = require("../models/usersModel");
const bcrypt = require("bcrypt");

const registerUser = async (RegisterUserData) => {
    try{
        const existingUser = await User.findOne({email: RegisterUserData?.email});

        if(existingUser) {
            return new Error("User with this email already exists"); 
        }
        // hash password
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(
            RegisterUserData.password,
            saltRounds
        );

        await User.create({
            firstName: RegisterUserData.firstName,
            lastName: RegisterUserData.lastName,
            email: RegisterUserData.email,
            passwordHash: passwordHash,
            role: RegisterUserData.role || 'user',
        })
    }catch (err) {
        throw new Error(err.message);
    }

};

module.exports = {registerUser};
