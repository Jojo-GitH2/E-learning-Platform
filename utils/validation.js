
const handleAuthValidation = (error) => {
    let errorMessages = { email: '', password: '', fullName: '', phoneNumber: '' };

    
    // Validation errors
    if (error.message.includes("User validation failed")) {
        Object.values(error.errors).forEach(({ properties }) => {
            errorMessages[properties.path] = properties.message;
        });
    }

    // if (error.code === 11000) {
    //     // console.log(error);
    //     const key = Object.keys(error.keyValue)[0];
    //     // console.log(error.keyValue[key]);
    //     errorMessages[key] = `${key} already exists`;

    // }
    if (error.code === 11000) {
        const keys = Object.keys(error.keyValue);
        keys.forEach((key) => {
            errorMessages[key] = `${key} already exists`;
        });
    } else if (error.message === "11000") {
        errorMessages.email = "email already exists";
    }

    return errorMessages;


}

module.exports = {
    handleAuthValidation
}