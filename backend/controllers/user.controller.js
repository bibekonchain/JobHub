import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// Register a new user
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body; // Extract user details from request body

    // Check if all required fields are provided
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Some fields are missing.",
        success: false,
      });
    }

    const file = req.file; // Get the uploaded profile picture file
    const fileUri = getDataUri(file); // Convert file to a URI format
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content); // Upload profile picture to Cloudinary

    // Check if the user already exists by email
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists with this email.",
        success: false,
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the provided data
    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword, // Store hashed password
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url, // Save profile photo URL
      },
    });

    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error); // Log the error for debugging
  }
};

// User login
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body; // Extract login credentials from request body

    // Check if all required fields are provided
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Some fields are missing.",
        success: false,
      });
    }

    // Find the user by email
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    // Verify if the password matches the hashed password in the database
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    // Check if the role matches the user's role
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with the selected role.",
        success: false,
      });
    }

    // Generate a JWT token with the user's ID
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // Return the user data (excluding sensitive information) along with the token
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // 🔐 Required for HTTPS
        sameSite: "None", // 🪄 Must be 'None' for cross-origin cookies
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      }) // Set token in an HTTP-only cookie
      .json({
        message: `Welcome back, ${user.fullname}.`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error); // Log the error for debugging
  }
};

// User logout
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error); // Log the error for debugging
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body; // Extract updated profile details from request body
    const file = req.file; // Get uploaded file (if any)

    // If a file is uploaded, upload it to Cloudinary
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(","); // Convert skills string to array
    }

    const userId = req.id; // Get the logged-in user's ID from authentication middleware
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false,
      });
    }

    // Update user data if provided
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    // Update resume if a new file is uploaded
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url; // Save the Cloudinary URL
      user.profile.resumeOriginalName = file.originalname; // Save the original file name
    }

    await user.save(); // Save the updated user data

    // Return updated user data (excluding sensitive information)
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error); // Log the error for debugging
  }
};
