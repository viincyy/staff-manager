var dsnv = new DanhSachNhanVien();
var validation = new Validation();

getLocalStorage();

getEle("btnThem").addEventListener("click", function() {
  //   Làm nút "Cập nhật" ẩn đi trên Modal
  getEle("btnCapNhat").style.display = "none";
  getEle("btnThemNV").style.display = "block";

  getEle("msnv").removeAttribute("disabled");
});

getEle("btnThemNV").addEventListener("click", function() {
  // Lấy value từ 6 ô input user nhập vào
  var maNV = getEle("msnv").value;
  var tenNV = getEle("name").value;
  var email = getEle("email").value;
  var password = getEle("password").value;
  var date = getEle("datepicker").value;
  var chucVu = getEle("chucvu").value;

  var isValid = true;

  isValid &=
    validation.kiemTraRong(maNV, "tbMaNV", "(*) Mã NV k được rỗng") &&
    validation.kiemTraDoDaiKyTu(
      maNV,
      4,
      11,
      "tbMaNV",
      "(*) Độ dài ký tự 4 - 10"
    ) &&
    validation.kiemTraTrungMa(
      maNV,
      "tbMaNV",
      "(*) Mã NV đã tồn tại",
      dsnv.mangNhanVien
    );
  isValid &=
    validation.kiemTraRong(tenNV, "tbTen", "(*) Tên NV k được rỗng") &&
    validation.kiemTraChuoi(tenNV, "tbTen", "(*) Ký tự phải là chuỗi");
  isValid &=
    validation.kiemTraRong(email, "tbEmail", "(*) Email k được rỗng") &&
    validation.kiemTraEmail(email, "tbEmail", "(*) Email k đúng định dạng!");
  isValid &= validation.kiemTraRong(
    password,
    "tbMatKhau",
    "(*) Password k được rỗng"
  );
  isValid &= validation.kiemTraRong(date, "tbNgay", "(*) Date k được rỗng");
  isValid &= validation.kiemTraChucVu("chucvu", "tbChucVu", "(*) Chọn chức vụ");

  //   Nếu như isValid bằng true thì mới thêm thanh công NV
  if (isValid) {
    var nhanVien = new NhanVien(maNV, tenNV, email, password, date, chucVu);
    dsnv.themNhanVien(nhanVien);
    setLocalStorage();
    taoBang();
  }
});

/**
 * Cách 1
 */
// function taoBang() {
//   var tBody = getEle("tableDanhSach");
//   tBody.innerHTML = "";
//   for (var i = 0; i < dsnv.mangNhanVien.length; i++) {
//     var tagTR = document.createElement("tr");

//     var tdMa = document.createElement("td");
//     var tdTen = document.createElement("td");
//     var tdEmail = document.createElement("td");
//     var tdDate = document.createElement("td");
//     var tdChucVu = document.createElement("td");

//     tdMa.innerHTML = dsnv.mangNhanVien[i].maNV;
//     tdTen.innerHTML = dsnv.mangNhanVien[i].tenNV;
//     tdEmail.innerHTML = dsnv.mangNhanVien[i].email;
//     tdDate.innerHTML = dsnv.mangNhanVien[i].date;
//     tdChucVu.innerHTML = dsnv.mangNhanVien[i].chucVu;

//     tagTR.appendChild(tdMa);
//     tagTR.appendChild(tdTen);
//     tagTR.appendChild(tdEmail);
//     tagTR.appendChild(tdDate);
//     tagTR.appendChild(tdChucVu);

//     tBody.appendChild(tagTR);
//   }
// }

/**
 *
 * Cách 2
 */
// Default Params => ES6
function taoBang(mang = dsnv.mangNhanVien) {
  var tBody = getEle("tableDanhSach");
  var contentHTML = "";
  mang.map(function(item) {
    contentHTML += `
            <tr>
                <td>${item.maNV}</td>
                <td>${item.tenNV}</td>
                <td>${item.email}</td>
                <td>${item.date}</td>
                <td>${item.chucVu}</td>
                <td>
                  <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="suaNV('${item.maNV}')">Sửa</button>
                  <button class="btn btn-danger" onclick="xoaNV('${item.maNV}')">Xóa</button>
                </td>
            </tr>
        `;
  });

  tBody.innerHTML = contentHTML;
}

/**
 * Xoa NV
 */
function xoaNV(maNV) {
  dsnv.xoaNhanVien(maNV);
  taoBang();
  setLocalStorage();
}

/**
 * Sua NV
 */
function suaNV(maNV) {
  getEle("btnCapNhat").style.display = "block";
  getEle("btnThemNV").style.display = "none";

  var nhanVien = dsnv.layThongTinNhanVien(maNV);

  getEle("msnv").value = nhanVien.maNV;
  getEle("msnv").setAttribute("disabled", true);

  getEle("name").value = nhanVien.tenNV;
  getEle("email").value = nhanVien.email;
  getEle("password").value = nhanVien.password;
  getEle("datepicker").value = nhanVien.date;
  getEle("chucvu").value = nhanVien.chucVu;
}

/**
 * Cap nhat NV
 */
getEle("btnCapNhat").addEventListener("click", function() {
  // Lấy value từ 6 ô input user nhập vào
  var maNV = getEle("msnv").value;
  var tenNV = getEle("name").value;
  var email = getEle("email").value;
  var password = getEle("password").value;
  var date = getEle("datepicker").value;
  var chucVu = getEle("chucvu").value;

  var nhanVien = new NhanVien(maNV, tenNV, email, password, date, chucVu);

  dsnv.capNhatNhanVien(nhanVien);
  taoBang();
  setLocalStorage();

  getEle("btnDong").click();
});

/**
 * Search
 */
getEle("searchName").addEventListener("keyup", function() {
  var chuoiTimKiem = getEle("searchName").value;
  var mangTimKiem = dsnv.timKiemNhanVien(chuoiTimKiem);
  taoBang(mangTimKiem);
});

function setLocalStorage() {
  /**
   * setLocalStorage - Lưu giá trị muốn lưu xuống LocalStorage
   * Lưu xuống phải chuyển value sang chuỗi
   */
  localStorage.setItem("DSNV", JSON.stringify(dsnv.mangNhanVien));
}

function getLocalStorage() {
  /**
   * Lấy giá trị được lưu LocalStorage lên dùng
   * Chuyển qua JSON để dùng.
   */
  if (localStorage.getItem("DSNV")) {
    dsnv.mangNhanVien = JSON.parse(localStorage.getItem("DSNV"));
    taoBang();
  }
}

function getEle(id) {
  return document.getElementById(id);
}
