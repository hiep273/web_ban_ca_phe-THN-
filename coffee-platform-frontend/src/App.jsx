import AdminApp from "./admin/AdminApp.jsx";
import CustomerApp from "./customer/CustomerApp.jsx";
import { useEffect, useState } from "react";

function getRoute() {
  return window.location.hash.replace("#", "") || "/";
}

export default function App() {
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  if (route.startsWith("/admin")) {
    return <AdminApp />;
  }

  return <CustomerApp />;
}
