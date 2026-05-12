import { useState } from "react";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import { products } from "./data/customerData.js";
import { useCustomerRouter } from "./hooks/useCustomerRouter.js";
import CartPage from "./pages/CartPage.jsx";
import FlavorQuizPage from "./pages/FlavorQuizPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";

export default function CustomerApp() {
  const { route, navigate } = useCustomerRouter();
  const [cart, setCart] = useState([
    { productId: "dalat-red-bourbon", qty: 1, subscription: true },
  ]);

  const activeProduct =
    products.find((product) => route === `/product/${product.id}`) || products[0];
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const addToCart = (productId) => {
    setCart((items) => {
      const existing = items.find((item) => item.productId === productId);
      if (existing) {
        return items.map((item) =>
          item.productId === productId ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...items, { productId, qty: 1, subscription: false }];
    });
    navigate("/cart");
  };

  return (
    <div className="app-shell">
      <Header route={route} navigate={navigate} cartCount={cartCount} />
      {route === "/" && <HomePage navigate={navigate} addToCart={addToCart} />}
      {route.startsWith("/product/") && (
        <ProductDetailPage
          product={activeProduct}
          addToCart={addToCart}
          navigate={navigate}
        />
      )}
      {route === "/quiz" && (
        <FlavorQuizPage navigate={navigate} addToCart={addToCart} />
      )}
      {route === "/cart" && (
        <CartPage cart={cart} setCart={setCart} navigate={navigate} />
      )}
      <Footer navigate={navigate} />
    </div>
  );
}
