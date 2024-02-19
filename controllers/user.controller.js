const user = require("../models/users");
const bcrypt = require("bcrypt");

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

  //  Check if the user already exists with the given email
    const findExUser = await user.findOne({ email: email });

    if (findExUser) {
      throw new Error("User is already registered");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const data = await user.create({ name, email, password: hashedPassword });

    res.status(201).json({
      message: "User data created",
      data,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const checkUser = await user.findOne({ email: email });

    if (!checkUser) {
      throw new Error("Invalid email address");
    }

    const checkPass = await bcrypt.compare(password, checkUser.password);

    if (!checkPass) {
      throw new Error("Invalid password");
    }

    // Set the userId in the session upon successful login
    req.session.userId = checkUser._id;
    console.log("🚀 ~ logIn ~ userId:", req.session.userId);

    res.status(200).json({
      message: `Welcome ${email} to your profile`,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

const getUser = async(req, res, next)=>{
  try {
      const userData=await user.find()

      if(!userData){
        throw new Error('no user data available')
      }

      res.status(200).json({
        message: "all users",
        userData: userData,
      });
  } catch (error) {
    res.status(404).json({
      message:error
    })
  }
}
const logOut = async(req, res, next)=>{
  try {
      
    req.session.destroy()
      res.status(204).json({
       
      });
  } catch (error) {
    res.status(404).json({
      message:error
    })
  }
}
module.exports = {
  createUser,
  logIn,
  getUser,
  logOut,
};
