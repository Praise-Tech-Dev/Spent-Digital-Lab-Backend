const User = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

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

const loginUser = async (loginUserData) => {
    try {
        const user = await User.findOne({ email: loginUserData?.email });
        if (!user) {
            return new Error("User not found");
        }
        const isPasswordValid = await bcrypt.compare(loginUserData?.password, user.passwordHash);
        if (!isPasswordValid) {
            return new Error("Invalid password");
        }

        //generate token 
        const token = await jwt.sign({userId: user._id, email: user.email, role: user.role}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN || '1h'});

        return {user: {
            email: user.email,
            role: user.role,
            phoneNo: user.phoneNo
        },
        token: token,
    };
    } catch (error) {
        throw new Error(error.message);
        
    }
}

module.exports = {registerUser, loginUser};
