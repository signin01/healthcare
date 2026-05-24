import React, { useState } from 'react';
import toast from 'react-hot-toast';

function OrderTracking() {
    const [orderId, setOrderId] = useState('');
    const [order, setOrder] = useState(null);

    const trackOrder = () => {
        if (!orderId) { toast.error('Enter Order ID'); return; }
        // Mock order data
        const mockOrder = {
            id: orderId,
            status: 'Out for Delivery',
            estimated: 'Today, 6:00 PM',
            steps: ['Order Placed', 'Processed', 'Shipped', 'Out for Delivery', 'Delivered'],
            currentStep: 3
        };
        setOrder(mockOrder);
        toast.success('Order found!');
    };

    return (
        <div style={{ padding: '20px' }}>
            <h3>?? Track Your Order</h3>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <input type="text" placeholder="Enter Order ID" value={orderId} onChange={(e) => setOrderId(e.target.value)} style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
                <button onClick={trackOrder} style={{ padding: '10px 20px', background: '#4caf50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Track</button>
            </div>
            {order && (
                <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '10px' }}>
                    <h4>Order #{order.id}</h4>
                    <p>Status: <strong style={{ color: '#4caf50' }}>{order.status}</strong></p>
                    <p>Estimated Delivery: {order.estimated}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                        {order.steps.map((step, idx) => (
                            <div key={idx} style={{ textAlign: 'center', flex: 1 }}>
                                <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: idx <= order.currentStep ? '#4caf50' : '#ddd', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>{idx <= order.currentStep ? '?' : idx + 1}</div>
                                <small>{step}</small>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
export default OrderTracking;
