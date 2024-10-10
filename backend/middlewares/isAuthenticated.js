import jwt from "jsonwebtoken";

// Middleware to check if the user is authenticated
const isAuthenticated = async (req, res, next) => {
  try {
    // Retrieve token from cookies
    const token = req.cookies.token;

    // If no token is found, return a 401 Unauthorized error
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    // Verify the token using the secret key
    const decode = await jwt.verify(token, process.env.SECRET_KEY);

    // If token verification fails, return a 401 error
    if (!decode) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }

    // Attach the decoded userId to the request object for further use
    req.id = decode.userId;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.log(error); // Log the error for debugging
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export default isAuthenticated;
