import generatePayload from 'promptpay-qr';

/**
 * สร้าง PromptPay QR Code payload
 * @param {string} phoneNumber - เบอร์โทรศัพท์หรือบัตรประชาชน (เริ่มต้นด้วย 0 สำหรับเบอร์โทร)
 * @param {number} amount - จำนวนเงิน (บาท)
 * @returns {string} QR Code payload string
 */
export const generatePromptPayPayload = (phoneNumber, amount) => {
  try {
    // แปลงเบอร์โทรศัพท์ให้เป็นรูปแบบที่ถูกต้อง
    // ถ้าเบอร์โทรเริ่มต้นด้วย 0, เปลี่ยนเป็น +66
    let formattedPhone = phoneNumber;
    if (phoneNumber.startsWith('0')) {
      formattedPhone = '+66' + phoneNumber.substring(1);
    }
    
    // สร้าง payload สำหรับ PromptPay QR Code
    const payload = generatePayload(formattedPhone, { amount: amount });
    
    return payload;
  } catch (error) {
    console.error('Error generating PromptPay payload:', error);
    throw new Error('ไม่สามารถสร้าง QR Code ได้');
  }
};

/**
 * ตรวจสอบรูปแบบเบอร์โทรศัพท์ไทย
 * @param {string} phoneNumber - เบอร์โทรศัพท์
 * @returns {boolean} true ถ้าเป็นเบอร์โทรที่ถูกต้อง
 */
export const validatePhoneNumber = (phoneNumber) => {
  // รูปแบบเบอร์โทรไทย: 0XXXXXXXXX (10 หลัก เริ่มต้นด้วย 0)
  const phoneRegex = /^0[0-9]{9}$/;
  return phoneRegex.test(phoneNumber);
};

/**
 * ตรวจสอบรูปแบบบัตรประชาชน
 * @param {string} nationalId - บัตรประชาชน
 * @returns {boolean} true ถ้าเป็นบัตรประชาชนที่ถูกต้อง
 */
export const validateNationalId = (nationalId) => {
  // รูปแบบบัตรประชาชนไทย: XXXXXXXXXXXXX (13 หลัก)
  const idRegex = /^[0-9]{13}$/;
  return idRegex.test(nationalId);
};

/**
 * ตรวจสอบจำนวนเงิน
 * @param {number} amount - จำนวนเงิน
 * @returns {boolean} true ถ้าจำนวนเงินถูกต้อง
 */
export const validateAmount = (amount) => {
  return amount >= 0.01 && amount <= 10000000;
};
