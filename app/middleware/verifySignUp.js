const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Kiểm tra username
    const usernameUser = await User.findOne({ username: req.body.username });
    if (usernameUser) {
      return res
        .status(400)
        .send({ message: "Failed! Username is already in use!" });
    }

    // Kiểm tra email
    const emailUser = await User.findOne({ email: req.body.email });
    if (emailUser) {
      return res
        .status(400)
        .send({ message: "Failed! Email is already in use!" });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let role of req.body.roles) {
      if (!ROLES.includes(role)) {
        return res
          .status(400)
          .send({ message: `Failed! Role ${role} does not exist!` });
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
};

module.exports = verifySignUp;
