function DanhSachNhanVien() {
  this.mangNhanVien = [];

  this.themNhanVien = function(nhanVien) {
    this.mangNhanVien.push(nhanVien);
  };

  this.timViTri = function(maNV) {
    /**
     * Tim ViTri
     * var viTri = -1; //Chưa tìm thấy
     * 0. Duyet mang mangNhanVien
     * 1. Nếu nhanVien.maNV === maNVXoa
     * 2. => Tìm được vị trí => viTri = index;
     */

    return this.mangNhanVien.findIndex(function(item) {
      return item.maNV === maNV;
    });
  };

  this.xoaNhanVien = function(maNV) {
    var viTri = this.timViTri(maNV);

    if (viTri !== -1) {
      this.mangNhanVien.splice(viTri, 1);
    }
  };

  this.layThongTinNhanVien = function(maNV) {
    // var viTri = this.timViTri(maNV);

    // if (viTri !== -1) {
    //   return this.mangNhanVien[viTri];
    // }

    return this.mangNhanVien.find(function(item) {
      return item.maNV === maNV;
    });
  };
}

DanhSachNhanVien.prototype.capNhatNhanVien = function(nhanVien) {
  var viTri = this.timViTri(nhanVien.maNV);

  if (viTri !== -1) {
    this.mangNhanVien[viTri] = nhanVien;
  }
};

DanhSachNhanVien.prototype.timKiemNhanVien = function(chuoiTimKiem) {
  /**
   * Tạo ra mangTimKiem = []
   * 0. Duyet mang NV
   * 1. So sanh tenNV trong từng phần tử của mảng có trùng với chuoiTimKiem
   * 2. mangTimKiem.push(nv);
   * 3. return mangTimKiem
   */

  // var mangTimKiem = [];
  // this.mangNhanVien.forEach(function(item) {
  //   if (item.tenNV.toLowerCase().indexOf(chuoiTimKiem.toLowerCase()) !== -1) {
  //     mangTimKiem.push(item);
  //   }
  // });

  // return mangTimKiem;

  return this.mangNhanVien.filter(function(item) {
    return item.tenNV.toLowerCase().indexOf(chuoiTimKiem.toLowerCase()) !== -1;
  });
};

/**
 * some => boolen: true || false
 * forEach  => duyet mang
 * map  => duyet mang, trả về mảng mới
 * find => trả về object tìm thấy trong mảng
 * findIndex => trả về số chỉ mục tìm thấy trong mảng
 * filter => trả về mảng sau khi lọc tương ứng với điều kiện
 * push => thêm vào mảng
 * splice => xóa phần tử trong mảng
 */
