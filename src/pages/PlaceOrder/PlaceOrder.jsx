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

    const handlePromptPaySelect = () => {
        setPayment("promptpay")
        setShowPromptPayModal(true)
    }

    const handlePromptPayOrder = async () => {
        if (!paymentSlip) {
            toast.error("กรุณาแนบสลิปการโอนเงิน")
            return;
        }

        setShowPromptPayModal(false)
        
        try {
            // ส่งคำสั่งซื้อแบบปกติก่อน
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
                paymentMethod: "promptpay"
            }
            
            // ส่งคำสั่งซื้อผ่าน endpoint COD แต่ระบุว่าเป็น PromptPay
            let response = await axios.post(url + "/api/order/placecod", orderData, { 
                headers: { token } 
            });
            
            if (response.data.success) {
                // TODO: ในอนาคตอาจจะส่งสลิปไปยัง API แยกต่างหาก
                // ตอนนี้แค่เก็บไว้ใน localStorage ชั่วคราว
                localStorage.setItem(`paymentSlip_${response.data.orderId}`, URL.createObjectURL(paymentSlip));
                
                navigate("/myorders")
                toast.success("คำสั่งซื้อของคุณได้รับการยืนยันแล้ว")
                setCartItems({});
            }
            else {
                toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง")
            }
        } catch (error) {
            console.error("PromptPay order error:", error);
            toast.error("เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง")
        }
    }

    const placeOrder = async (e) => {
        e.preventDefault()
        
        // ถ้าเลือก PromptPay ให้เปิด Modal แทน
        if (payment === "promptpay") {
            setShowPromptPayModal(true)
            return;
        }
        
        // สำหรับ COD เท่านั้น
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
        
        let response = await axios.post(url + "/api/order/placecod", orderData, { headers: { token } });
        if (response.data.success) {
            navigate("/myorders")
            toast.success(response.data.message)
            setCartItems({});
        }
        else {
            toast.error("Something Went Wrong")
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
                </div>
                <button className='place-order-submit' type='submit'>
                    {payment === "cod" ? "Place Order" : "ยืนยันคำสั่งซื้อ"}
                </button>
            </div>
        </form>
        
        {/* PromptPay Modal */}
        {showPromptPayModal && (
            <div className="promptpay-modal-overlay">
                <div className="promptpay-modal">
                    <div className="modal-header">
                        <h2>💳 ชำระเงินผ่าน PromptPay</h2>
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
                                <h3>📱 สแกน QR Code เพื่อโอนเงิน</h3>
                                <div className="qr-wrapper">
                                    <PromptPayQRCode 
                                        phoneNumber={getPromptPayNumber()}
                                        amount={getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + deliveryCharge}
                                        size={160}
                                    />
                                </div>
                            </div>
                            
                            <div className="slip-upload-section">
                                <h3>📎 แนบสลิปการโอนเงิน</h3>
                                <div className="upload-area">
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={handleSlipUpload}
                                        className="slip-upload"
                                        id="slip-upload"
                                    />
                                    <label htmlFor="slip-upload" className="upload-label">
                                        📷 เลือกไฟล์รูปภาพ หรือ ลากไฟล์มาวางที่นี่
                                    </label>
                                </div>
                                {paymentSlip && (
                                    <div className="slip-preview">
                                        <div className="preview-wrapper">
                                            <img 
                                                src={URL.createObjectURL(paymentSlip)} 
                                                alt="Payment Slip" 
                                                className="slip-preview-img"
                                                title="รูปสลิปที่แนบ"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        
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
                                ยกเลิก
                            </button>
                            <button 
                                type="button"
                                className="confirm-btn" 
                                onClick={handlePromptPayOrder}
                                disabled={!paymentSlip}
                            >
                                ยืนยันการแนบสลิปและสั่งซื้อ
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
