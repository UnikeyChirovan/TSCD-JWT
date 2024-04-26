const db = require("../models");
const User = db.user;
const Role = db.role;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Thêm hàm validation để kiểm tra dữ liệu đầu vào
const validateUserData = (userData) => {
  // Thực hiện kiểm tra dữ liệu ở đây, ví dụ:
  if (!userData.username || !userData.email || !userData.password) {
    throw new Error("Username, email, and password are required.");
  }
};

exports.signup = async (req, res) => {
  try {
    // Validate dữ liệu đầu vào
    validateUserData(req.body);

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    // Lưu người dùng vào cơ sở dữ liệu
    await user.save();

    let roles = ["user"]; // Mặc định là role user

    // Nếu roles được cung cấp từ request, gán roles mới
    if (req.body.roles) {
      const foundRoles = await Role.find({ name: { $in: req.body.roles } });
      roles = foundRoles.map((role) => role.name);
    }

    user.roles = roles;
    await user.save();

    res.status(201).send({ message: "User was registered successfully!" });
  } catch (error) {
    res
      .status(400)
      .send({ message: error.message || "Failed to register user." });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username }).populate(
      "roles",
      "-__v"
    );

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid password!" });
    }

    const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: 86400, // 24 hours
    });

    const authorities = user.roles.map(
      (role) => "ROLE_" + role.name.toUpperCase()
    );

    // Lưu token vào session
    req.session.token = token;

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      roles: authorities,
      token: token,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Failed to sign in." });
  }
};

exports.signout = async (req, res) => {
  try {
    // Xóa token khỏi session khi đăng xuất
    req.session.token = null;
    res.status(200).send({ message: "You've been signed out!" });
  } catch (error) {
    res.status(500).send({ message: error.message || "Failed to sign out." });
  }
};
