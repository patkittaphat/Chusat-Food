import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { generatePromptPayPayload } from '../../utils/promptpay';
import { assets } from '../../assets/assets';

const PromptPayQRCode = ({ 
  phoneNumber = "0928146947", // เบอร์โทรศัพท์หรือบัตรประชาชนของร้าน
  amount, 
  size = 280,
  className = "qr-code"
}) => {
  try {
    // สร้าง QR payload
    const payload = generatePromptPayPayload(phoneNumber, amount);
    
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: size > 250 ? '20px' : '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Header Logo - Thai QR Payment Logo 01 */}
        <div style={{ 
          marginBottom: '0px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: `${size}px`
        }}>
          <img 
            src={assets.thai_qr_header}
            alt="Thai QR Payment"
            style={{
              width: `${size}px`,
              height: size > 250 ? '100px' : '60px',
              objectFit: 'cover'
            }}
            onError={(e) => {
              console.warn('Header logo failed to load:', e.target.src);
              e.target.style.display = 'none';
            }}
          />
        </div>

        {/* QR Code Container with Center Logo */}
        <div style={{ 
          position: 'relative', 
          display: 'inline-block',
          margin: '0 auto'
        }}>
          <QRCodeSVG
            value={payload}
            size={size}
            level="M"
            includeMargin={true}
            className={className}
            style={{
              border: 'none',
              borderRadius: '8px',
              display: 'block',
              margin: '0 auto'
            }}
          />
          {/* Center Logo - Thai QR Payment Logo 03 */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'white',
              borderRadius: '8px',
              padding: '4px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img 
              src={assets.thai_qr_center}
              alt="Thai QR Payment Center Logo"
              style={{
                width: size * 0.10,
                height: size * 0.10,
                objectFit: 'contain',
                borderRadius: '6px'
              }}
              onError={(e) => {
                // หาก load รูปไม่ได้ ให้แสดงข้อความ PP แทน
                e.target.style.display = 'none';
                const fallback = document.createElement('div');
                fallback.innerHTML = 'PP';
                fallback.style.cssText = `
                  width: ${size * 0.10}px;
                  height: ${size * 0.10}px;
                  background: linear-gradient(135deg, #1e40af 0%, #10b981 100%);
                  color: white;
                  font-size: ${size * 0.03}px;
                  font-weight: bold;
                  text-align: center;
                  line-height: ${size * 0.10}px;
                  border-radius: 6px;
                  font-family: Arial, sans-serif;
                `;
                e.target.parentElement.appendChild(fallback);
              }}
            />
          </div>
        </div>

        {/* Amount Display */}
        <div style={{ 
          marginTop: size > 250 ? '20px' : '10px', 
          fontSize: size > 250 ? '18px' : '14px', 
          fontWeight: 'bold', 
          color: '#333',
          textAlign: 'center'
        }}>
          จำนวนเงิน: ฿{amount.toLocaleString()}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error rendering QR code:', error);
    return (
      <div 
        className={`${className} error-qr`}
        style={{
          width: size,
          height: size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
          border: '2px dashed #ccc',
          borderRadius: '8px',
          color: '#666',
          fontSize: '14px',
          textAlign: 'center',
          padding: '20px'
        }}
      >
        ไม่สามารถสร้าง QR Code ได้<br/>
        กรุณาลองใหม่อีกครั้ง
      </div>
    );
  }
};

export default PromptPayQRCode;
