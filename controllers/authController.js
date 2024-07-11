const User = require("../models/User");
const { handleAuthValidation } = require("../utils/validation");

const handleSignUp = async (req, res) => {
    try {
        // console.log(req.body);
        const { fullName, email, password, phoneNumber } =  req.body;

        // console.log(fullName, email, password, phoneNumber);

        const newUser = new User(
            {
                fullName,
                email,
                password,
                phoneNumber
            }
        );

        await newUser.save();

        return res
            .status(200)
            .json({ newUser, message: "User created successfully" });
    } catch (error) {

        errors = handleAuthValidation(error);
        // console.log(error);
        return res.status(400).json({ errors});
    }
};


module.exports = { handleSignUp };