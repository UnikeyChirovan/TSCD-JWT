const mongoose = require("mongoose");

// Định nghĩa một schema cho đối tượng Role
const RoleSchema = new mongoose.Schema(
  {
    // Trường name là tên của vai trò, ví dụ: "admin", "moderator", "user",...
    name: {
      type: String,
      required: true,
      unique: true, // Tên của vai trò là duy nhất
    },
    // Trường description có thể chứa mô tả về vai trò, ví dụ: "Quản trị hệ thống", "Quản lý nội dung",...
    description: {
      type: String,
      default: "", // Mặc định là chuỗi rỗng
    },
    // Trường permissions có thể là một mảng chứa các quyền của vai trò, ví dụ: ["read", "write", "delete"]
    permissions: {
      type: [String],
      default: [], // Mặc định là một mảng rỗng
    },
  },
  { timestamps: true }
); // Thêm hai trường createdAt và updatedAt tự động

// Tạo một model Role từ schema đã định nghĩa
const Role = mongoose.model("Role", RoleSchema);

// Xuất model Role để có thể sử dụng trong các module khác
module.exports = Role;
