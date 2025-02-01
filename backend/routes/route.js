const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const user = require("../models/userschema");

router.post("/sign-in", async (req, res) => {
  try {
    const { username } = req.body;
    const { email } = req.body;

    const exist = await user.findOne({ username: username });

    if (exist) {
      return res.json({
        success: true,
        message: "user already exist",
      });
    } else if (username.length < 5) {
      return res.json({
        success: false,
        message: "username must be at least 5 characters",
      });
    }

    const existEmail = await user.findOne({ email: email });

    if (existEmail) {
      return res.json({
        success: true,
        message: "email already exist",
      });
    }
    const hashpassword = await bcrypt.hash(req.body.password, 10);

    const newuser = new user({
      username: req.body.username,
      email: req.body.email,
      password: hashpassword,
    });

    await newuser.save();

    return res.json({
      success: true,
      message: "user created successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username } = req.body;
    const { password } = req.body;

    const exist = await user.findOne({ username: username });

    if (!exist) {
      return res.json({
        success: false,
        message: "user not found",
      });
    }
    bcrypt.compare(password, exist.password, (err, result) => {
      if (result) {
        const authClaims = [
          { name: exist.username },
          { jti: jwt.sign({}, "aj2004") },
        ];
        const token = jwt.sign(
          { authClaims },
          "aj2004",
          { expiresIn: "2d" },
          { id: exist._id }
        );
        return res.json({
          success: true,
          message: "user login successfully",
          token: token,
          id: exist._id,
        });
      } else {
        return res.json({
          success: false,
          message: "wrong password",
        });
      }
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
