const User = require("../models/User");

const handleSignUp = async (req, res) => {
    try {
        // console.log(req.body);
        const { fullName, email, password, phoneNumber } =  req.body;

        console.log(fullName, email, password, phoneNumber);

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
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
};


module.exports = { handleSignUp };