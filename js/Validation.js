function Validation() {
  this.kiemTraTrungMa = function(input, spanId, message, dsnv) {
    /**
     * 0.Duyet mang NV
     * 1. status = false;
     * 2. So sanh maNV === nhanVien.maNV => status = true
     */
    var status = false;

    // dsnv.forEach(function(item) {
    //   if (item.maNV === input) {
    //     status = true;
    //   }
    // });

    status = dsnv.some(function(item) {
      return item.maNV === input;
    });

    if (status) {
      //Show lỗi
      getEle(spanId).style.display = "block";
      getEle(spanId).innerHTML = message;
      return false;
    }

    getEle(spanId).style.display = "none";
    getEle(spanId).innerHTML = "";
    return true;
  };

  this.kiemTraRong = function(input, spanId, message) {
    if (input === "") {
      getEle(spanId).style.display = "block";
      getEle(spanId).innerHTML = message;
      return false;
    }

    getEle(spanId).style.display = "none";
    getEle(spanId).innerHTML = "";
    return true;
  };

  this.kiemTraChucVu = function(id, spanId, message) {
    if (getEle(id).selectedIndex !== 0) {
      getEle(spanId).style.display = "none";
      getEle(spanId).innerHTML = "";
      return true;
    }

    getEle(spanId).style.display = "block";
    getEle(spanId).innerHTML = message;
    return false;
  };

  this.kiemTraDoDaiKyTu = function(input, min, max, spanId, message) {
    if (input.length > min && input.length < max) {
      getEle(spanId).style.display = "none";
      getEle(spanId).innerHTML = "";
      return true;
    }

    getEle(spanId).style.display = "block";
    getEle(spanId).innerHTML = message;
    return false;
  };

  this.kiemTraChuoi = function(input, spanId, message) {
    var pattern = new RegExp(
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
        "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
        "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
    );

    if (pattern.test(input)) {
      getEle(spanId).style.display = "none";
      getEle(spanId).innerHTML = "";
      return true;
    }

    getEle(spanId).style.display = "block";
    getEle(spanId).innerHTML = message;
    return false;
  };

  this.kiemTraEmail = function(input, spanId, message) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (input.match(mailformat)) {
      getEle(spanId).style.display = "none";
      getEle(spanId).innerHTML = "";
      return true;
    }

    getEle(spanId).style.display = "block";
    getEle(spanId).innerHTML = message;
    return false;
  };
}
