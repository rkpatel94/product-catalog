import React, { useState } from "react";
import ProductItemGrid from "./ProductItemGrid";
import "./ProductList.scss";
import ProductItemTable from "./ProductItemTable";

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

interface Props {
    products: Product[];
    cartData: CartItem[];
    addToCart: (product: Product, quantity: number) => void;
}

const ProductList: React.FC<Props> = ({ products, cartData, addToCart }) => {
    const [layout, setLayout] = useState<"grid" | "table">("grid");

    const toggleLayout = () => {
        setLayout(layout === "grid" ? "table" : "grid");
    };

    return (
        <div className="products-list">
            <button onClick={toggleLayout}>Toggle Layout</button>
            {layout === "grid" ? <div className="product-list grid">
                {products.map((product) => (
                    <ProductItemGrid
                        key={product.id}
                        cartData={cartData.find((item) => item.product.id === product.id)}
                        product={product}
                        inventory={product.inventoryCount}
                        addToCart={addToCart}
                    />
                ))}
            </div> : <div className="product-list table">
                <ProductItemTable products={products}
                    addToCart={addToCart}
                    cartData={cartData}
                />
            </div>}
        </div>
    );
};

export default ProductList;
