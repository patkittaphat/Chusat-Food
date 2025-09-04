import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Booking.css';

const initialTables = [
  { id: 'A01', available: false }, { id: 'A02', available: true }, { id: 'A03', available: true }, { id: 'A04', available: true }, { id: 'A05', available: false },
  { id: 'B01', available: true }, { id: 'B02', available: true }, { id: 'B03', available: true }, { id: 'B04', available: true }, { id: 'B05', available: true },
  { id: 'C01', available: true }, { id: 'C02', available: true }, { id: 'C03', available: true }, { id: 'C04', available: true }, { id: 'C05', available: true },
  { id: 'D01', available: true }, { id: 'D02', available: true }, { id: 'D03', available: true }, { id: 'D04', available: true }, { id: 'D05', available: true },
];

const Booking = () => {
  const [tables] = useState(initialTables);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const columns = [[], [], [], [], []];
  tables.forEach((table, idx) => {
    columns[idx % 5].push(table);
  });

  const handleConfirm = () => {
    if (selected) {
      navigate('/booking-confirm', { state: { tableId: selected } });
    }
  };

  return (
    <div className="booking-page">
      <div className="booking-container">
        <h1 className="booking-title">Booking</h1>
        
        <div className="booking-table-grid">
          {columns.map((col, i) => (
            <div key={i} className="booking-table-column">
              {col.map(table => (
                <button
                  key={table.id}
                  disabled={!table.available}
                  onClick={() => setSelected(table.id)}
                  className={`booking-table-btn${selected === table.id ? ' selected' : ''}${!table.available ? ' unavailable' : ''}`}
                >
                  {table.id}
                </button>
              ))}
            </div>
          ))}
        </div>

        <div className="booking-confirm-section">
          <button
            className={`booking-confirm-btn${!selected ? ' disabled' : ''}`}
            onClick={handleConfirm}
            disabled={!selected}
          >
            จอง
          </button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
