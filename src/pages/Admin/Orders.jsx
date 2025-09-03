import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
// import { assets, currency } from "../../assets/assets";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data.reverse());
      } else {
        toast.error(response.data.message || "Failed to load orders");
      }
    } catch (err) {
      toast.error("Error fetching orders");
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${apiUrl}/api/order/status`, {
        orderId,
        status: event.target.value,
      });
      if (response.data.success) {
        await fetchAllOrders();
      } else {
        toast.error(response.data.message || "Failed to update status");
      }
    } catch (err) {
      toast.error("Error updating status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <p className="text-sm text-gray-700">
                {order.items.map((item, index) => (
                  <span key={index}>
                    {item.name} x {item.quantity}
                    {index < order.items.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
              <p className="font-medium mt-1">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p className="text-sm text-gray-600">
                {order.address.street}, {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
              </p>
              <p className="text-sm text-gray-600">{order.address.phone}</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-semibold">{order.amount}</p>
              <select
                onChange={(e) => statusHandler(e, order._id)}
                value={order.status}
                className="border border-gray-300 rounded px-3 py-2 bg-white"
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
