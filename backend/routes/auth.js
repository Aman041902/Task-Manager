const jwt = require("jsonwebtoken");

// const user = require("../models/userschema");

const authi = (req, res, next) => {
  try {
    // Check if the Authorization header exists
    const token = req.headers.authorization?.split(" ")[1];

    // If no token is found, return an error
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is missing",
      });
    }

    // Verify the token using the secret key
    const verified = jwt.verify(token, "aj2004");
    // console.log(verified);

    // Attach the decoded token (which includes the user info) to req.user
    req.user = verified;

    // Continue to the next middleware or route handler
    next();
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = { authi };
