// Alternative PromptPayQRCode with image logo
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { generatePromptPayPayload } from '../../utils/promptpay';

const PromptPayQRCodeWithImageLogo = ({ 
  phoneNumber = "0928146947",
  amount, 
  size = 280,
  className = "qr-code"
}) => {
  try {
    const payload = generatePromptPayPayload(phoneNumber, amount);
    
    return (
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <QRCodeSVG
          value={payload}
          size={size}
          level="M"
          includeMargin={true}
          className={className}
          style={{
            border: 'none',
            borderRadius: '8px',
            display: 'block'
          }}
        />
        {/* ใช้รูป logo จริง */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            borderRadius: '8px',
            padding: '6px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: '2px solid #e5e7eb'
          }}
        >
          {/* แทนที่ด้วยรูป PromptPay logo จริง */}
          <img 
            src="/src/assets/promptpay_logo.png" // วางไฟล์ logo ที่นี่
            alt="PromptPay Logo"
            style={{
              width: size * 0.12,
              height: size * 0.12,
              objectFit: 'contain'
            }}
            onError={(e) => {
              // หาก load รูปไม่ได้ ให้แสดงข้อความแทน
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          {/* Fallback text */}
          <div 
            style={{
              display: 'none',
              width: size * 0.12,
              height: size * 0.12,
              backgroundColor: '#1e40af',
              color: 'white',
              fontSize: size * 0.03,
              fontWeight: 'bold',
              textAlign: 'center',
              lineHeight: `${size * 0.12}px`,
              borderRadius: '4px'
            }}
          >
            PP
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error rendering QR code:', error);
    return (
      <div className={`${className} error-qr`}>
        ไม่สามารถสร้าง QR Code ได้
      </div>
    );
  }
};

export { PromptPayQRCodeWithImageLogo };
