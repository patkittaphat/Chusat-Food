import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BookingConfirm.css';
// ...existing code...

const BookingConfirm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tableId } = location.state || {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    people: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = (fields = form) => {
    const e = {};
    if (!fields.name || !fields.name.trim()) e.name = 'กรุณากรอกชื่อผู้จอง';
    if (!fields.phone || !fields.phone.trim()) {
      e.phone = 'กรุณากรอกเบอร์โทรศัพท์';
    } else if (!/^[0-9+\-()\s]{7,20}$/.test(fields.phone)) {
      e.phone = 'รูปแบบเบอร์โทรไม่ถูกต้อง';
    }
    if (!fields.date) e.date = 'กรุณาเลือกวันที่จอง';
    if (!fields.time) e.time = 'กรุณาเลือกเวลาจอง';
    if (!fields.people || Number(fields.people) < 1) e.people = 'จำนวนคนต้องไม่น้อยกว่า 1';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'people' ? (value ? Number(value) : '') : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eObj = validate();
    setErrors(eObj);
    if (Object.keys(eObj).length === 0) {
      const payload = { ...form, tableId: tableId || null };
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/booking/reserve`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          alert('จองโต๊ะสำเร็จ!');
          navigate('/');
        } else {
          alert('เกิดข้อผิดพลาด: ' + (data.error || 'ไม่สามารถจองโต๊ะได้'));
        }
      } catch (err) {
        alert('เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์');
      }
      setLoading(false);
    }
  };

  const isValid = Object.keys(validate()).length === 0;

  return (
    <div className="bookingconfirm-container">
      <h2 className="bookingconfirm-title">แบบฟอร์มการจอง</h2>

      <div className="bookingconfirm-box">
        {tableId ? <p>โต๊ะที่เลือก: <strong className="bookingconfirm-tableid">{tableId}</strong></p> : <p>ยังไม่ได้เลือกโต๊ะ</p>}

        <form className="booking-form" onSubmit={handleSubmit} noValidate>
          <label>
            ชื่อผู้จอง
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="ชื่อ-นามสกุล"
              required
            />
            {errors.name && <div className="field-error">{errors.name}</div>}
          </label>

          <label>
            เบอร์โทรศัพท์
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="0812345678"
              required
            />
            {errors.phone && <div className="field-error">{errors.phone}</div>}
          </label>

          <label>
            วันที่จอง
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              required
            />
            {errors.date && <div className="field-error">{errors.date}</div>}
          </label>

          <label>
            เวลาจอง
            <input
              name="time"
              type="time"
              value={form.time}
              onChange={handleChange}
              required
            />
            {errors.time && <div className="field-error">{errors.time}</div>}
          </label>

          <label>
            จำนวนคน
            <input
              name="people"
              type="number"
              min="1"
              value={form.people}
              onChange={handleChange}
              required
            />
            {errors.people && <div className="field-error">{errors.people}</div>}
          </label>

          <div className="bookingconfirm-btn-row">
            <button type="submit" className="bookingconfirm-btn confirm" disabled={!isValid || loading}>
              {loading ? "กำลังส่ง..." : "ยืนยันการจอง"}
            </button>
            <button type="button" className="bookingconfirm-btn cancel" onClick={() => navigate(-1)}>
              ยกเลิก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingConfirm;