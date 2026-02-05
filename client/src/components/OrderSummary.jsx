import '../styles/OrderSummary.css';

const OrderSummary = ({ items, total }) => {
    const shipping = 10.00;
    const tax = total * 0.08;
    const grandTotal = total + shipping + tax;

    return (
        <div className="order-summary">
            <h3>Order Summary</h3>

            <div className="summary-items">
                {items.map((item, index) => (
                    <div key={index} className="summary-item">
                        <span>{item.name} ({item.size}, {item.color}) × {item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                ))}
            </div>

            <div className="summary-totals">
                <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>${total.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                    <span>Shipping:</span>
                    <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                    <span>Tax (8%):</span>
                    <span>${tax.toFixed(2)}</span>
                </div>
                <div className="summary-row total">
                    <span>Total:</span>
                    <span>${grandTotal.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
