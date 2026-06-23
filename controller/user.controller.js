const User = require("../model/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER

exports.register = async (req, res) => {
  try {
    const {
      email,
      userName,
      address,
      phoneNumber,
      age,
      gender,
      country,
      password,
    } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        sucess: false,
        message: "Email already Exist",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      userName,
      address,
      phoneNumber,
      age,
      gender,
      country,
      password: hashedPassword,
    });
    res.status(201).json({
      sucess: true,
      message: "Registration Successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    let token = jwt.sign(
      {
        userid: user._id,
        email: user.email,
      },
      process.env.JWT,
      {
        expiresIn: "1hr",
      },
    );
    res.status(201).json({
      success: true,
      message: "Login Successful",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// logout

exports.logoutUser = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    res.status(200).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error, error",
    });
  }
};
// get all users

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(201).json({
      success: true,
      message: "All users fetched successfully",
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// get by id

exports.getUserById = async (req, res) => {
  try {
    let user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return;
      res.status(400).json({
        success: false,
        message: "user not found",
      });
    }
    res.status(200).json({
      success: "true",
      message: "retrieved successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE USER

exports.deleteuser = async (req, res) => {
  try {
    let deleteUser = await User.findByIdAndDelete(req.params.id);

    if (!deleteUser) {
      return;
      res.status(400).json({
        success: false,
        message: "user not found",
      });
    }
    res.status(200).json({
      success: "true",
      message: "user Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE USER

exports.updateUser = async (req, res) => {
  try {
    const { password, ...otherData } = req.body;
    let updateData = { ...otherData };
    // if password is updated hash it

    if (password) {
      const hashedPassword = await bcrypt.hashedPassword(password, 10);
      updateData.password = hashedPassword;
    }
    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");
    if (!user) {
      return;
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
