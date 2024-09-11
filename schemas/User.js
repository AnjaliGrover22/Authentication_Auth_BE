const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
});

//Signup method
userSchema.statics.signup = async function (email, password) {
  //validation
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  if (!email || !password) {
    throw Error("All fields are needed");
  }
  //using validator package (importing required)
  if (!validator.isEmail(email)) {
    throw Error("This email is not valid");
  }
  if (validator.isStrongPassword(password)) {
    throw Error(
      "Make sure your password contains at least 8 characters, one uppercase,one lowercase, a number and a symbol"
    );
  }
  //to hash the keys bcrypt (do not accidently use bcrypt.js: its completely different)
  //password cannot be stored in string-> so we do salting and hashing using bcrypt package
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hash });
  return user;
};

//2. login method

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields are needed");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Email is not valid");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
