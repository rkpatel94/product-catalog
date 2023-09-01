import React from "react";
import "./Cart.scss";

interface CartItem {
    product: {
        id: number;
        name: string;
        price: number;
    };
    quantity: number;
    id: number;
}

interface CartProps {
    cartItems: CartItem[];
    removeFromCart: (productId: number) => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, removeFromCart }) => {
    return (
        <div className="cart">
            <h2>Cart</h2>
            {cartItems.map((item) => (
                <div key={item.product.id} className="cart-item">
                    <p>{item.product.name}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Subtotal: ${item.product.price * item.quantity}</p>
                    <button onClick={() => removeFromCart(item.id)}>
                        Remove
                    </button>
                </div>
            ))}
            <p>
                Total: $
                {cartItems.reduce(
                    (total, item) => total + item.product.price * item.quantity,
                    0
                )}
            </p>
        </div>
    );
};

export default Cart;
