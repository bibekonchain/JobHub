import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body; // Extract company name from request body

    // Check if the company name is provided
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required.",
        success: false,
      });
    }

    // Check if a company with the same name already exists
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "You can't register the same company.",
        success: false,
      });
    }

    // Create a new company entry in the database
    company = await Company.create({
      name: companyName,
      userId: req.id, // Associate the company with the logged-in user
    });

    return res.status(201).json({
      message: "Company registered successfully.",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error); // Log the error for debugging
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id; // Get the logged-in user's ID

    // Find all companies associated with the user
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(404).json({
        message: "Companies not found.",
        success: false,
      });
    }

    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error); // Log the error for debugging
  }
};

// Get company details by company ID
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id; // Extract company ID from request parameters

    // Find the company by its ID
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error); // Log the error for debugging
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body; // Extract updated company details from request body

    const file = req.file; // Extract uploaded file (company logo)

    // Convert the uploaded file into a format that can be used by Cloudinary
    const fileUri = getDataUri(file);

    // Upload the file to Cloudinary and get the URL for the logo
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const logo = cloudResponse.secure_url; // Store the secure URL of the uploaded logo

    // Prepare the data to update the company record
    const updateData = { name, description, website, location, logo };

    // Find the company by ID and update the company information
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    // If the company is not found, return a 404 error
    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company information updated.",
      success: true,
    });
  } catch (error) {
    console.log(error); // Log the error for debugging
  }
};
