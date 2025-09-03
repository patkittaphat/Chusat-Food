import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AppDownload.css';

const initialTables = [
  { id: 'A01', available: false }, { id: 'A02', available: true }, { id: 'A03', available: true }, { id: 'A04', available: true }, { id: 'A05', available: false },
  { id: 'B01', available: true }, { id: 'B02', available: true }, { id: 'B03', available: true }, { id: 'B04', available: true }, { id: 'B05', available: true },
  { id: 'C01', available: true }, { id: 'C02', available: true }, { id: 'C03', available: true }, { id: 'C04', available: true }, { id: 'C05', available: true },
  { id: 'D01', available: true }, { id: 'D02', available: true }, { id: 'D03', available: true }, { id: 'D04', available: true }, { id: 'D05', available: true },
];

const AppDownload = () => {
  const [showTable, setShowTable] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [backAnimate, setBackAnimate] = useState(false);
  const [returnAnimate, setReturnAnimate] = useState(false); // <-- new
  const [tables] = useState(initialTables);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const columns = [[], [], [], [], []];
  tables.forEach((table, idx) => {
    columns[idx % 5].push(table);
  });

  const handleClick = () => {
    setAnimate(true);
    setTimeout(() => setShowTable(true), 400);
  };

  const handleBack = () => {
    setBackAnimate(true);
    setTimeout(() => {
      setShowTable(false);
      setAnimate(false);
      setBackAnimate(false);
      setSelected(null);
      // start return animation for buttons when main view appears
      setReturnAnimate(true);
      // turn off return animation after it plays
      setTimeout(() => setReturnAnimate(false), 600);
    }, 400);
  };

  const handleConfirm = () => {
    if (selected) {
      navigate('/booking-confirm', { state: { tableId: selected } });
    }
  };

  return (
    <div id="reserve" className="appdownload-center">
      {!showTable ? (
        <div className="appdownload-btn-row">
          <button
            className={`appdownload-ingredient-btn appdownload-big-btn${returnAnimate ? ' button-return-animate' : ''}`}
          >
            ingredient
          </button>
          <button
            onClick={handleClick}
            className={`appdownload-booking-btn appdownload-big-btn${animate ? ' button-animate' : ''}${returnAnimate ? ' button-return-animate' : ''}`}
          >
            Booking
          </button>
        </div>
      ) : (
        <div className={`appdownload-tablebox fade-in-table${backAnimate ? ' fade-out-table' : ''}`}>
          <h2 className="appdownload-table-title">Booking</h2>
          <div className="appdownload-table-row">
            {columns.map((col, i) => (
              <div key={i} className="appdownload-table-col">
                {col.map(table => (
                  <button
                    key={table.id}
                    disabled={!table.available}
                    onClick={() => setSelected(table.id)}
                    className={`appdownload-table-btn${selected === table.id ? ' selected' : ''}${!table.available ? ' unavailable' : ''}`}
                  >
                    {table.id}
                  </button>
                ))}
              </div>
            ))}
          </div>
          <div className="appdownload-table-info">
            <span style={{ color: '#4caf50', fontWeight: 'bold' }}>■</span> = ว่าง,&nbsp;
            <span style={{ color: '#bdbdbd', fontWeight: 'bold' }}>■</span> = ไม่ว่าง
          </div>
          <div className="appdownload-confirm-row-bottom">
            <button
              className="appdownload-confirm-btn"
              style={
                selected
                  ? {}
                  : { opacity: 0, pointerEvents: 'none' }
              }
              onClick={handleConfirm}
            >
              จอง
            </button>
          </div>
          <div className="appdownload-back-btn-row">
            <button
              className="appdownload-back-btn"
              onClick={handleBack}
              aria-label="ย้อนกลับ"
            >
              <span className="appdownload-back-arrow">&lt;</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppDownload;