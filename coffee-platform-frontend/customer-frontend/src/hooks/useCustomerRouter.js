import { useEffect, useState } from "react";

function getRoute() {
  return window.location.hash.replace("#", "") || "/";
}

export function useCustomerRouter() {
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigate = (nextRoute) => {
    window.location.hash = nextRoute;
    setRoute(nextRoute);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return { route, navigate };
}
