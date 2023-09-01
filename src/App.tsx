import React, { useState, useEffect } from "react";
import ProductList from "./ProductList";
import Cart from "./Cart";
import "./App.scss";

interface Product {
  id: number;
  name: string;
  price: number;
  inventoryCount: number;
  limitPerOrder: number;
}

interface CartItem {
  product: Product;
  quantity: number;
  id: number;
}

const App: React.FC = () => {

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('http://localhost:5000/products')
      const data = await res.json()
      setProductsData(data)
    }
    const fetchCart = async () => {
      const res = await fetch('http://localhost:5000/cart')
      const data = await res.json()
      setCartItems(data)
    }
    fetchCart();
    fetchProducts();
  }, []);

  const addToCart = async (product: Product, quantity: number) => {
    const existingItem = cartItems.find((item) => item.product.id === product.id);
    if (existingItem) {
      if (existingItem.quantity + quantity <= product.limitPerOrder) {
        existingItem.quantity += quantity;
        await fetch(`http://localhost:5000/cart/${existingItem.id}`, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(existingItem),
        })
        setCartItems([...cartItems]);
      }
    } else {
      if (quantity <= product.limitPerOrder) {
        const res = await fetch('http://localhost:5000/cart', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ product: product, quantity: quantity }),
        })

        const data = await res.json()
        setCartItems([...cartItems, data]);
      }
    }

  };

  const removeFromCart = async (productId: number) => {
    const res = await fetch(`http://localhost:5000/cart/${productId}`, {
      method: 'DELETE',
    })
    res.status === 200
      ? setCartItems(cartItems.filter((item) => item.product.id !== productId))
      : alert('Error Deleting This Budget')

  };

  return (
    <div className="app">
      <ProductList
        products={productsData}
        cartData={cartItems}
        addToCart={addToCart}
      />
      <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
    </div>
  );
};

export default App;
