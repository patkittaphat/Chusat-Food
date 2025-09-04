import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import PromptPayQRCode from '../../components/PromptPayQRCode/PromptPayQRCode';
import { getPromptPayNumber } from '../../config/shop';

const PlaceOrder = () => {

    const [payment, setPayment] = useState("cod")
    const [paymentSlip, setPaymentSlip] = useState(null)
    const [showPromptPayModal, setShowPromptPayModal] = useState(false)
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    })

    const { getTotalCartAmount, token, food_list, cartItems, url, setCartItems,currency,deliveryCharge } = useContext(StoreContext);

    // ฟังก์ชันตรวจสอบว่าข้อมูลครบหรือไม่
    const isDeliveryInfoComplete = () => {
        const requiredFields = ['firstName', 'lastName', 'email', 'street', 'city', 'state', 'zipcode', 'country', 'phone'];
        return requiredFields.every(field => data[field] && data[field].trim() !== '');
    }

    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }

    const handleSlipUpload = (event) => {
        const file = event.target.files[0]
        if (file) {
            setPaymentSlip(file)
        }
    }

    // ฟังก์ชันตรวจสอบความครบถ้วนของข้อมูล Delivery Information
    const validateDeliveryInfo = () => {
        const requiredFields = [
            { field: 'firstName', label: 'ชื่อ' },
            { field: 'lastName', label: 'นามสกุล' },
            { field: 'email', label: 'อีเมล' },
            { field: 'street', label: 'ที่อยู่' },
            { field: 'city', label: 'เมือง' },
            { field: 'state', label: 'รัฐ/จังหวัด' },
            { field: 'zipcode', label: 'รหัสไปรษณีย์' },
            { field: 'country', label: 'ประเทศ' },
            { field: 'phone', label: 'เบอร์โทรศัพท์' }
        ];

        const missingFields = requiredFields.filter(({ field }) => !data[field] || data[field].trim() === '');
        
        if (missingFields.length > 0) {
            const missingLabels = missingFields.map(({ label }) => label).join(', ');
            toast.error(`Please fill in all required fields: ${missingLabels}`);
            return false;
        }

        return true;
    }

    const handlePromptPaySelect = () => {
        // ตรวจสอบข้อมูล Delivery Information ก่อนเปิด Modal
        if (!validateDeliveryInfo()) {
            return;
        }
        setPayment("promptpay")
        setShowPromptPayModal(true)
    }

    const handlePromptPayOrder = async () => {
        // ตรวจสอบข้อมูล Delivery Information อีกครั้ง
        if (!validateDeliveryInfo()) {
            setShowPromptPayModal(false);
            return;
        }

        if (!paymentSlip) {
            toast.error("Please upload payment slip")
            return;
        }

        // เมื่อแนบสลิปแล้ว ให้ปิด Modal และให้ผู้ใช้กดปุ่ม "ยืนยันคำสั่งซื้อ" ด้านล่าง
        setShowPromptPayModal(false)
        toast.success("Payment slip uploaded successfully. Please click 'Confirm Order' button below to place order")
    }

    const placeOrder = async (e) => {
        e.preventDefault()
        
        // ถ้าเลือก PromptPay ให้เปิด Modal แทน (กรณีที่ยังไม่ได้แนบสลิป)
        if (payment === "promptpay" && !paymentSlip) {
            setShowPromptPayModal(true)
            return;
        }
        
        // ตรวจสอบข้อมูลครบถ้วน
        if (!validateDeliveryInfo()) {
            return;
        }
        
        let orderItems = [];
        food_list.map(((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo)
            }
        }))
        
        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + deliveryCharge,
        }
        
        try {
            let response;
            
            if (payment === "promptpay" && paymentSlip) {
                // สำหรับ PromptPay ที่มีสลิปแล้ว
                orderData.paymentMethod = "promptpay";
                response = await axios.post(url + "/api/order/placecod", orderData, { headers: { token } });
                
                if (response.data.success) {
                    // เก็บสลิปใน localStorage
                    localStorage.setItem(`paymentSlip_${response.data.orderId}`, URL.createObjectURL(paymentSlip));
                    
                    navigate("/myorders")
                    toast.success("Your order has been confirmed successfully")
                    setCartItems({});
                    setPaymentSlip(null); // เคลียร์สลิป
                }
                else {
                    toast.error("Something went wrong, please try again")
                }
            } else {
                // สำหรับ COD
                response = await axios.post(url + "/api/order/placecod", orderData, { headers: { token } });
                
                if (response.data.success) {
                    navigate("/myorders")
                    toast.success(response.data.message)
                    setCartItems({});
                }
                else {
                    toast.error("Something Went Wrong")
                }
            }
        } catch (error) {
            console.error("Order error:", error);
            toast.error("An error occurred while sending data, please try again")
        }
    }

    useEffect(() => {
        if (!token) {
            toast.error("to place an order sign in first")
            navigate('/cart')
        }
        else if (getTotalCartAmount() === 0) {
            navigate('/cart')
        }
    }, [token])

    return (
        <>
        <form onSubmit={placeOrder} className='place-order'>
            <div className="place-order-left">
                <p className='title'>Delivery Information</p>
                <div className="multi-field">
                    <input type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First name' required />
                    <input type="text" name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last name' required />
                </div>
                <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Email address' required />
                <input type="text" name='street' onChange={onChangeHandler} value={data.street} placeholder='Street' required />
                <div className="multi-field">
                    <input type="text" name='city' onChange={onChangeHandler} value={data.city} placeholder='City' required />
                    <input type="text" name='state' onChange={onChangeHandler} value={data.state} placeholder='State' required />
                </div>
                <div className="multi-field">
                    <input type="text" name='zipcode' onChange={onChangeHandler} value={data.zipcode} placeholder='Zip code' required />
                    <input type="text" name='country' onChange={onChangeHandler} value={data.country} placeholder='Country' required />
                </div>
                <input type="text" name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone' required />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details"><p>Subtotal</p><p>{currency}{getTotalCartAmount()}</p></div>
                        <hr />
                        <div className="cart-total-details"><p>Delivery Fee</p><p>{currency}{getTotalCartAmount() === 0 ? 0 : deliveryCharge}</p></div>
                        <hr />
                        <div className="cart-total-details"><b>Total</b><b>{currency}{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + deliveryCharge}</b></div>
                    </div>
                </div>
                <div className="payment">
                    <h2>Payment Method</h2>
                    <div onClick={() => setPayment("cod")} className="payment-option">
                        <img src={payment === "cod" ? assets.checked : assets.un_checked} alt="" />
                        <p>COD ( Cash on delivery )</p>
                    </div>
                    <div onClick={handlePromptPaySelect} className="payment-option">
                        <img src={payment === "promptpay" ? assets.checked : assets.un_checked} alt="" />
                        <p>PromptPay ( โอนผ่าน QR Code )</p>
                    </div>
                    {payment === "promptpay" && paymentSlip && (
                        <div style={{
                            background: '#d4edda',
                            border: '1px solid #c3e6cb',
                            borderRadius: '6px',
                            padding: '8px 12px',
                            margin: '8px 0',
                            color: '#155724',
                            fontSize: '14px'
                        }}>
                            ✅ Payment slip uploaded successfully
                        </div>
                    )}
                </div>
                <button className='place-order-submit' type='submit'>
                    {payment === "cod" 
                        ? "Place Order" 
                        : paymentSlip 
                        ? "Confirm Order (PromptPay)" 
                        : "Select PromptPay Payment"}
                </button>
            </div>
        </form>
        
        {/* PromptPay Modal */}
        {showPromptPayModal && (
            <div className="promptpay-modal-overlay">
                <div className="promptpay-modal">
                    <div className="modal-header">
                        <h2>💳 Payment via PromptPay</h2>
                        <button 
                            className="close-modal" 
                            onClick={() => setShowPromptPayModal(false)}
                        >
                            ✕
                        </button>
                    </div>
                    
                    <div className="modal-content">
                        <div className="modal-content-flex">
                            <div className="qr-code-section">
                                <h3>📱 Scan QR Code to Transfer Money</h3>
                                <div className="qr-wrapper">
                                    <PromptPayQRCode 
                                        phoneNumber={getPromptPayNumber()}
                                        amount={getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + deliveryCharge}
                                        size={160}
                                    />
                                </div>
                            </div>
                            
                            <div className="slip-upload-section">
                                <h3>📎 Upload Payment Slip</h3>
                                <div className="upload-area">
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={handleSlipUpload}
                                        className="slip-upload"
                                        id="slip-upload"
                                    />
                                    <label htmlFor="slip-upload" className="upload-label">
                                        📷 Choose image file or drag and drop here
                                    </label>
                                </div>
                                {paymentSlip && (
                                    <div className="slip-preview">
                                        <div className="preview-wrapper">
                                            <img 
                                                src={URL.createObjectURL(paymentSlip)} 
                                                alt="Payment Slip" 
                                                className="slip-preview-img"
                                                title="Uploaded payment slip"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        {/* แสดงข้อความเตือนหากข้อมูลไม่ครบถ้วน */}
                        {!isDeliveryInfoComplete() && (
                            <div style={{
                                background: '#fff3cd',
                                border: '1px solid #ffeaa7',
                                borderRadius: '6px',
                                padding: '12px',
                                margin: '10px 0',
                                color: '#856404'
                            }}>
                                ⚠️ <strong>Please fill in all Delivery Information fields before confirming your order</strong>
                            </div>
                        )}
                        
                        <div className="modal-actions">
                            <button 
                                type="button"
                                className="cancel-btn" 
                                onClick={() => {
                                    setShowPromptPayModal(false)
                                    setPayment("cod")
                                    setPaymentSlip(null)
                                }}
                            >
                                Cancel
                            </button>
                            <button 
                                type="button"
                                className="confirm-btn" 
                                onClick={handlePromptPayOrder}
                                disabled={!paymentSlip || !isDeliveryInfoComplete()}
                                title={!isDeliveryInfoComplete() ? "Please fill in delivery information completely" : !paymentSlip ? "Please upload payment slip" : ""}
                            >
                                Confirm Slip Upload
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}

export default PlaceOrder
