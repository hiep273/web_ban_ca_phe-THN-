import { useEffect, useState } from "react";
import { getFlavors } from "@coffee-platform/shared/api/flavorApi.js";
import { getProducts } from "@coffee-platform/shared/api/productApi.js";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import { fallbackFlavors, fallbackProducts } from "./data/customerData.js";
import { useCustomerRouter } from "./hooks/useCustomerRouter.js";
import CartPage from "./pages/CartPage.jsx";
import FlavorQuizPage from "./pages/FlavorQuizPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";

export default function CustomerApp() {
  const { route, navigate } = useCustomerRouter();
  const [products, setProducts] = useState(fallbackProducts);
  const [flavors, setFlavors] = useState(fallbackFlavors);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState("");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      try {
        setIsLoadingProducts(true);
        const data = await getProducts();

        if (isMounted && data.length > 0) {
          setProducts(data);
          setProductsError("");
        }
      } catch {
        if (isMounted) {
          setProducts(fallbackProducts);
          setProductsError("Chưa kết nối được API sản phẩm, đang hiển thị dữ liệu mẫu.");
        }
      } finally {
        if (isMounted) {
          setIsLoadingProducts(false);
        }
      }
    }

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadFlavors() {
      try {
        const data = await getFlavors();

        if (isMounted && data.length > 0) {
          setFlavors(data);
        }
      } catch {
        if (isMounted) {
          setFlavors(fallbackFlavors);
        }
      }
    }

    loadFlavors();

    return () => {
      isMounted = false;
    };
  }, []);

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
      <Header
        route={route}
        navigate={navigate}
        cartCount={cartCount}
        featuredProductId={products[0]?.id}
      />
      {route === "/" && (
        <HomePage
          navigate={navigate}
          addToCart={addToCart}
          products={products}
          isLoadingProducts={isLoadingProducts}
          productsError={productsError}
        />
      )}
      {route.startsWith("/product/") && (
        <ProductDetailPage
          product={activeProduct}
          addToCart={addToCart}
          navigate={navigate}
        />
      )}
      {route === "/quiz" && (
        <FlavorQuizPage
          navigate={navigate}
          addToCart={addToCart}
          products={products}
          flavors={flavors}
        />
      )}
      {route === "/cart" && (
        <CartPage
          cart={cart}
          setCart={setCart}
          navigate={navigate}
          products={products}
        />
      )}
      <Footer navigate={navigate} />
    </div>
  );
}
