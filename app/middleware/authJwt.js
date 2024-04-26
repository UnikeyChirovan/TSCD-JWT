const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;
const Role = db.role;

const verifyToken = async (req, res, next) => {
  try {
    const token = req.session.token;
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).send({ message: "Unauthorized!" });
  }
};

const checkRole = (roleName) => async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).exec();
    const roles = await Role.find({ _id: { $in: user.roles } }).exec();
    const roleNames = roles.map((role) => role.name);

    if (roleNames.includes(roleName)) {
      next();
    } else {
      return res.status(403).send({ message: `Require ${roleName} Role!` });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const authJwt = {
  verifyToken,
  isAdmin: checkRole("admin"),
  isModerator: checkRole("moderator"),
};

module.exports = authJwt;
