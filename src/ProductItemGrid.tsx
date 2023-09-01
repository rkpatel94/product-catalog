import React, { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  inventoryCount: number;
  limitPerOrder: number;
}

interface Props {
  product: Product;
  inventory: number;
  addToCart: (product: Product, quantity: number) => void;
  cartData: any;
}

const ProductItem: React.FC<Props> = ({ product, inventory, addToCart, cartData }) => {
  const [quantity, setQuantity] = useState<number>(0);

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(product, quantity);
      setQuantity(0);
    }
  };

  const remainingCount = product.inventoryCount - cartData?.quantity;

  return (
    <div className="product-item">
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      <p>Inventory: {inventory}</p>
      <p className="warning">
        {(remainingCount < 2 && remainingCount !== 0) ? "One Item is remaining" : remainingCount === 0 ? "Out Of Stock" : ""}
      </p>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        max={inventory}
      />
      <button disabled={remainingCount === 0} onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductItem;
