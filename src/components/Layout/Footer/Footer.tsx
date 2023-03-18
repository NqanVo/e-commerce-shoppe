import React, { memo } from "react";
import { transform } from "typescript";
import "./Footer.scss";

const payment = [
  "https://down-vn.img.susercontent.com/file/d4bbea4570b93bfd5fc652ca82a262a8",
  "https://down-vn.img.susercontent.com/file/a0a9062ebe19b45c1ae0506f16af5c16",
  "https://down-vn.img.susercontent.com/file/38fd98e55806c3b2e4535c4e4a6c4c08",
  "https://down-vn.img.susercontent.com/file/bc2a874caeee705449c164be385b796c",
  "https://down-vn.img.susercontent.com/file/2c46b83d84111ddc32cfd3b5995d9281",
  "https://down-vn.img.susercontent.com/file/5e3f0bee86058637ff23cfdf2e14ca09",
  "https://down-vn.img.susercontent.com/file/9263fa8c83628f5deff55e2a90758b06",
  "https://down-vn.img.susercontent.com/file/0217f1d345587aa0a300e69e2195c492",
];
const ship = [
  "https://down-vn.img.susercontent.com/file/5e7282bd0f7ee0872fdb0bd1d40fbe9e",
  "https://down-vn.img.susercontent.com/file/5e7282bd0f7ee0872fdb0bd1d40fbe9e",
  "https://down-vn.img.susercontent.com/file/5e7282bd0f7ee0872fdb0bd1d40fbe9e",
  "https://down-vn.img.susercontent.com/file/59270fb2f3fbb7cbc92fca3877edde3f",
  "https://down-vn.img.susercontent.com/file/59270fb2f3fbb7cbc92fca3877edde3f",
  "https://down-vn.img.susercontent.com/file/0d349e22ca8d4337d11c9b134cf9fe63",
  "https://down-vn.img.susercontent.com/file/3900aefbf52b1c180ba66e5ec91190e5",
  "https://down-vn.img.susercontent.com/file/6e3be504f08f88a15a28a9a447d94d3d",
];
const Footer = memo(() => {
  return (
    <footer>
      <div className="footer__container">
        <div className="footer__container__item">
          <h3>CHĂM SÓC KHÁCH HÀNG</h3>
          <p>Trung Tâm Trợ Giúp</p>
          <p>Shopee Blog</p>
          <p>Shopee Mall</p>
          <p>Hướng Dẫn Mua Hàng</p>
          <p>Hướng Dẫn Bán Hàng</p>
          <p>Thanh Toán</p>
          <p>Shopee Xu</p>
          <p>Vận Chuyển</p>
          <p>Trả Hàng & Hoàn Tiền</p>
          <p>Chăm Sóc Khách Hàng</p>
          <p>Chính Sách Bảo Hành</p>
        </div>
        <div className="footer__container__item">
          <h3>VỀ SHOPEE</h3>
          <p>Giới Thiệu Về Shopee Việt Nam</p>
          <p>Tuyển Dụng</p>
          <p>Điều Khoản Shopee</p>
          <p>Chính Sách Bảo Mật</p>
          <p>Chính Hãng</p>
          <p>Kênh Người Bán</p>
          <p>Flash Sales</p>
          <p>Chương Trình Tiếp Thị Liên Kết Shopee</p>
          <p>Liên Hệ Với Truyền Thông</p>
        </div>
        <div className="footer__container__item">
          <h3>THANH TOÁN</h3>
          <div className="footer__container__item__brand">
            {payment.map((item, index) => (
              <img key={index} src={item} alt="" />
            ))}
          </div>
          <h3>ĐƠN VỊ VẬN CHUYỂN</h3>
          <div className="footer__container__item__brand">
            {ship.map((item, index) => (
              <img key={index} src={item} alt="" />
            ))}
          </div>
        </div>
        <div className="footer__container__item">
          <h3>THEO DÕI CHÚNG TÔI TRÊN</h3>
          <p>Facebook</p>
          <p>Instagram</p>
          <p>LinkedIn</p>
        </div>
        <div className="footer__container__item">
          <h3>TẢI ỨNG DỤNG SHOPEE NGAY THÔI</h3>
          <img
            style={{ transform: "scale(0.5)" }}
            src="https://down-vn.img.susercontent.com/file/a5e589e8e118e937dc660f224b9a1472"
            alt=""
          />
        </div>
      </div>
    </footer>
  );
});

export default Footer;
