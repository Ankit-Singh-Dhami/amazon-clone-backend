const bcrypt = require("bcryptjs");
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");

exports.signIn = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All field required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();

    res
      .status(201)
      .json({ message: "user register successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "invalid password" });
    }

    const payload = {
      userId: user._id,
      role: user.role,
      name: user.name,
    };

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({ token, user, success: true });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};
