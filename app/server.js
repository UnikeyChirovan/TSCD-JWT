const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const db = require("./models/index");
const Role = db.role;

db.mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit(1); // Thoát với mã lỗi 1 nếu kết nối thất bại
  });

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "bezkoder-session",
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true,
  })
);
//

async function initial() {
  try {
    // Sử dụng await để lấy số lượng tài liệu trong bảng Role
    const count = await Role.estimatedDocumentCount();

    // Kiểm tra nếu số lượng tài liệu là 0
    if (count === 0) {
      // Tạo một số role mặc định nếu chưa có role nào trong bảng
      await Promise.all([
        // Tạo role "user"
        Role.create({ name: "user" }),
        // Tạo role "moderator"
        Role.create({ name: "moderator" }),
        // Tạo role "admin"
        Role.create({ name: "admin" }),
      ]);

      console.log("Roles have been initialized."); // Hiển thị thông báo
    } else {
      console.log("Roles have already been initialized."); // Hiển thị thông báo nếu đã có role trong bảng
    }
  } catch (err) {
    console.error("Error initializing roles:", err); // Xử lý lỗi nếu có
  }
}

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
