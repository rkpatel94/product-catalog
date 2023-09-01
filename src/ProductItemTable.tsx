import { useState } from "react";

interface Product {
    id: number;
    name: string;
    price: number;
    limitPerOrder: number;
    inventoryCount: number;
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

const ProductItemTable: React.FC<Props> = ({ products, addToCart, cartData }) => {
    const [quantity, setQuantity] = useState<number>(0);

    const handleAddToCart = (product: Product) => {
        if (quantity > 0) {
            addToCart(product, quantity);
            setQuantity(0);
        }
    };
    return (
        <table>
            <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Action</th>
            </tr>
            {products.map((product, key) => {
                const cartItem: any = cartData.find((item) => item.product.id === product.id)
                const remainingCount = product.inventoryCount - cartItem?.quantity;
                return (
                    <tr key={key}>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>
                            <p className="warning">
                                {(remainingCount < 2 && remainingCount !== 0) ? "One Item is remaining" : remainingCount === 0 ? "Out Of Stock" : ""}
                            </p>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                max={product.inventoryCount}
                            />
                            <button onClick={() => handleAddToCart(product)}>Add to Cart</button></td>
                    </tr>
                )
            })}
        </table>
    )
}

export default ProductItemTable;