const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail, isMobilePhone, isStrongPassword } = require('validator');

const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, validate: [isEmail, 'Please enter a valid email'] },
    password: { type: String, required: true, validate: [isStrongPassword, 'Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character'] },
    phoneNumber: { type: String, required: true, unique: true, validate: { validator: (value) => isMobilePhone(value, 'any', { strictMode: true }), message: 'Please enter a valid phone number with country code' } },
    verified: { type: Boolean, default: false },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    createdAt: { type: Date, default: Date.now },
});

// Mongoose hooks to hash password before saving to DB
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Create a Mongoose static method for login
UserSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('Please provide both email and password');
    }
    const user = await this.findOne({ email });
    if (!user) {
        throw Error('Invalid Credentials');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw Error('Invalid Credentials');
    }
    return user;
};

// method to handle enrolling a course
UserSchema.methods.enrollCourse = async function (courseId) {
    if (!this.enrolledCourses.includes(courseId)) {
        this.enrolledCourses.push(courseId);
        await this.save();
    }
};

// method to handle unenrolling a course
UserSchema.methods.unenrollCourse = async function (courseId) {
    this.enrolledCourses = this.enrolledCourses.filter(course => course.toString() !== courseId);
    await this.save();
};

module.exports = mongoose.model('User', UserSchema);
