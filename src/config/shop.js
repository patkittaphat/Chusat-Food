// ข้อมูล PromptPay ของร้าน
export const SHOP_CONFIG = {
  // เบอร์โทรศัพท์ PromptPay ของร้าน (10 หลัก เริ่มต้นด้วย 0)
  PROMPTPAY_PHONE: "0928146947",
  
  // หรือใช้เลขบัตรประชาชน (13 หลัก) - ใช้อย่างใดอย่างหนึ่ง
  PROMPTPAY_NATIONAL_ID: "1730201406278",
  
  // ชื่อร้าน
  SHOP_NAME: "ร้านอาหารจีน",
  
  // ข้อมูลติดต่อ
  SHOP_PHONE: "0928146947",
  SHOP_EMAIL: "kittapas.viriya@restaurant.com"
};

// ฟังก์ชันสำหรับดึงเบอร์ PromptPay
export const getPromptPayNumber = () => {
  return SHOP_CONFIG.PROMPTPAY_PHONE;
  // หรือ return SHOP_CONFIG.PROMPTPAY_NATIONAL_ID; ถ้าใช้เลขบัตรประชาชน
};
