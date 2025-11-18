const { registerUser } = require("../services/auth.services");
const StatusCodes = require("../utils/statusCodes");
const { RegisterUsersSchema } = require("../validation/authSchema");

const register = async (req, res) => {
    if(!req.body){
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Request body is missing",
        });
    }
    const {error, value} = RegisterUsersSchema.validate(req.body);
    
    

    if (error){
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: error.details[0].message
        }); 
    }

    try{
        const response = await registerUser(value);

        if(response instanceof Error){
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: response.message,
            })
        }   
    } catch (err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: err.message,
        })
    }

    return res.status(StatusCodes.OK).json({
        message: "User registered successfully",
    });
}


module.exports = register;