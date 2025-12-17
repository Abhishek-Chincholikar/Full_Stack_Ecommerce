import React, { useEffect, useState } from 'react';
import { backend_url, currency } from '../App';
import './CSS/Orders.css'; 
const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    if(localStorage.getItem('auth-token')){
        await fetch(backend_url + '/myorders', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'auth-token': localStorage.getItem('auth-token'),
                'Content-Type': 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => { setOrders(data) });
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className='orders-container'>
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        <div className="orders-list">
            {orders.map((order, index) => {
                return (
                    <div key={index} className="order-item">
                        <div className="order-header">
                            <h3>Order #{order._id.slice(-6).toUpperCase()}</h3>
                            <p className="order-status">{order.status}</p>
                        </div>
                        <p className="order-date">Date: {new Date(order.date).toLocaleDateString()}</p>
                        
                        <div className="order-products">
                            {order.items.map((item, i) => (
                                <p key={i}>
                                   {item.quantity} x {item.name} 
                                </p>
                            ))}
                        </div>
                        <div className="order-total">
                            Total: {currency}{order.amount}
                        </div>
                    </div>
                )
            })}
        </div>
      )}
    </div>
  )
}

export default Orders;