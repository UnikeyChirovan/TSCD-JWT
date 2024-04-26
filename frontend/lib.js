// // Đọc nội dung từ file .txt
// function readTextFile(file) {
//   const rawFile = new XMLHttpRequest();
//   rawFile.open("GET", file, false);
//   rawFile.onreadystatechange = function () {
//     if (rawFile.readyState === 4 && rawFile.status === 200) {
//       const content = rawFile.responseText;
//       displayContent(content);
//     }
//   };
//   rawFile.send(null);
// }

// // Hiển thị nội dung trong thẻ <div>
// function displayContent(content) {
//   const noidungDiv = document.querySelector(".noidung");
//   noidungDiv.textContent = content;
// }

// // Gọi hàm đọc file khi người dùng chọn chương
// document.querySelector(".dropdown-item").addEventListener("click", function () {
//   const filePath = this.getAttribute("href");
//   readTextFile(filePath);
// });

// mã hoạt động nhưng có một số vấn đề.
// 1. Chạy được chương 1 nhưng không chạy được các chương khác
// 2. Khi bỏ đi target="_blank" và bấm vào chương 1 thì giao diện chuyển sang http:127.0.0.1:5500/chapters/1.txt chứ không phải ở đường link hiện tại và thêm nội dung vào class = "noidung".
// ======================
// function readTextFile(file) {
//   const rawFile = new XMLHttpRequest();
//   rawFile.open("GET", file, false);
//   rawFile.onreadystatechange = function () {
//     if (rawFile.readyState === 4 && rawFile.status === 200) {
//       const content = rawFile.responseText;
//       displayContent(content);
//     }
//   };
//   rawFile.send(null);
// }

// function displayContent(content) {
//   const noidungDiv = document.querySelector(".noidung");
//   noidungDiv.textContent = content;
// }

// // Gọi hàm đọc file khi người dùng chọn chương
// document
//   .querySelector(".dropdown-item")
//   .addEventListener("click", function (event) {
//     event.preventDefault(); // Ngăn chặn mở file mới
//     const filePath = this.getAttribute("href");
//     readTextFile(filePath);
//   });

// =============================

// Hàm để đọc nội dung từ tệp văn bản
// function readTextFile(file) {
//   // Tạo một đối tượng XMLHttpRequest mới
//   const rawFile = new XMLHttpRequest();
//   // Mở một yêu cầu GET đến đường dẫn của tệp văn bản
//   rawFile.open("GET", file, false);
//   // Đặt một hàm callback để xử lý khi trạng thái của yêu cầu thay đổi
//   rawFile.onreadystatechange = function () {
//     // Nếu trạng thái của yêu cầu là 4 (hoàn thành) và mã trạng thái là 200 (OK)
//     if (rawFile.readyState === 4 && rawFile.status === 200) {
//       // Lấy nội dung của tệp văn bản
//       const content = rawFile.responseText;
//       // Hiển thị nội dung trên trang web
//       displayContent(content);
//     }
//   };
//   // Gửi yêu cầu
//   rawFile.send(null);
// }

// document.addEventListener("DOMContentLoaded", function () {
//   const paragraphs = document.querySelectorAll(".paragraph");
//   paragraphs.forEach(function (p) {
//     p.innerHTML = p.innerHTML.replace(/<\/?p>/g, "");
//   });
// });

// // Hàm để hiển thị nội dung trên trang web
// function displayContent(content) {
//   // Chọn phần tử HTML có lớp là "noidung"
//   const noidungPre = document.querySelector(".noidung");
//   // Đặt nội dung của phần tử HTML này bằng nội dung từ tệp văn bản
//   noidungPre.textContent = content;
// }

// // Lắng nghe sự kiện click trên tất cả các mục dropdown
// document.querySelectorAll(".dropdown-item").forEach(function (item) {
//   item.addEventListener("click", function (event) {
//     // Ngăn chặn hành động mặc định của sự kiện
//     event.preventDefault();
//     // Lấy đường dẫn của tệp từ thuộc tính href của mục được nhấp
//     const filePath = this.getAttribute("href");
//     // Gọi hàm để đọc tệp văn bản với đường dẫn đã lấy được
//     readTextFile(filePath);
//   });
// });
// =======================cải tiến==============================
// Hàm để đọc nội dung từ tệp văn bản
// async function readTextFile(file) {
//   // Sử dụng fetch để lấy nội dung của tệp
//   const response = await fetch(file);
//   // Kiểm tra nếu yêu cầu thành công
//   if (response.ok) {
//     const content = await response.text();
//     displayContent(content);
//   } else {
//     console.error("Error:", response.status, response.statusText);
//   }
// }
// // Sử dụng đoạn này nếu có thẻ p trong html nó sẽ loại bỏ thẻ p
// // document.addEventListener("DOMContentLoaded", function () {
// //   const paragraphs = document.querySelectorAll(".paragraph");
// //   paragraphs.forEach(function (p) {
// //     p.innerHTML = p.innerHTML.replace(/<\/?p>/g, "");
// //   });
// // });

// // Hàm để hiển thị nội dung trên trang web
// function displayContent(content) {
//   const noidungPre = document.querySelector(".noidung");
//   // Sử dụng innerHTML thay vì textContent
//   noidungPre.innerHTML = content;
// }

// // Lắng nghe sự kiện click trên tất cả các mục dropdown
// document.querySelectorAll(".dropdown-item").forEach(function (item) {
//   item.addEventListener("click", function (event) {
//     event.preventDefault();
//     const filePath = this.getAttribute("href");
//     readTextFile(filePath);
//   });
// });

// Dựa trên yêu cầu của bạn, tôi hiểu rằng bạn muốn loại bỏ các thẻ <p>
// khi hiển thị nội dung từ tệp B trên tệp A. Bạn có thể thực hiện điều này bằng
// cách sử dụng phương thức innerHTML thay vì textContent khi đặt nội dung cho
// phần tử .noidung. Phương thức innerHTML sẽ phân tích các thẻ HTML trong chuỗi bạn
// cung cấp, trong khi textContent sẽ hiển thị toàn bộ nội dung như văn bản thuần túy,
// bao gồm cả các thẻ HTML.
// ========================Cải tiên promax====================
// thêm chức năng thụt dòng canh giữa
// Hàm để đọc nội dung từ tệp văn bản
async function readTextFile(file) {
  // Sử dụng fetch để lấy nội dung của tệp
  const response = await fetch(file);
  // Kiểm tra nếu yêu cầu thành công
  if (response.ok) {
    let content = await response.text();
    // Chia nội dung thành các đoạn văn
    const paragraphs = content.split("\n");
    // Định dạng đoạn đầu tiên
    paragraphs[0] = `<p class="center">${paragraphs[0]}</p>`;
    // Định dạng các đoạn văn còn lại
    for (let i = 1; i < paragraphs.length; i++) {
      paragraphs[i] = `<p class="indent">${paragraphs[i]}</p>`;
    }
    // Nối các đoạn văn lại với nhau
    content = paragraphs.join("");
    displayContent(content);
  } else {
    console.error("Error:", response.status, response.statusText);
  }
}

// Hàm để hiển thị nội dung trên trang web
function displayContent(content) {
  const noidungDiv = document.querySelector(".noidung");
  // Sử dụng innerHTML thay vì textContent
  noidungDiv.innerHTML = content;
}

// Lắng nghe sự kiện click trên tất cả các mục dropdown
document.querySelectorAll(".dropdown-item").forEach(function (item) {
  item.addEventListener("click", function (event) {
    event.preventDefault();
    const filePath = this.getAttribute("href");
    readTextFile(filePath);
  });
});
