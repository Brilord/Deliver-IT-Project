import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { UserProvider } from "./UserContext";
import LandingPageCustomer from "./pages/LandingPage/LandingPageCustomer";
import LandingPageDriver from "./pages/LandingPage/LandingPageDriver";
import LandingPageManager from "./pages/LandingPage/LandingPageManager";
import MapViewPageCustomer from "./pages/MapViewPage/MapViewPageCustomer";
import MapViewPageDriver from "./pages/MapViewPage/MapViewPageDriver";
import MapViewPageManager from "./pages/MapViewPage/MapViewPageManager";
import SearchPageCustomer from "./pages/SearchPage/SearchPageCustomer";
import SearchPageManager from "./pages/SearchPage/SearchPageManager";
import LandingPage from "./pages/LandingPage/LandingPage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
function App() {
  const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret: clientSecret,
    appearance,
  };

  return (
    <UserProvider>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <Router>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/landingpage/customer"
                element={<LandingPageCustomer />}
              />
              <Route
                path="/landingpage/driver"
                element={<LandingPageDriver />}
              />
              <Route
                path="/landingpage/manager"
                element={<LandingPageManager />}
              />
              <Route
                path="/mapview/customer"
                element={<MapViewPageCustomer />}
              />
              <Route path="/mapview/driver" element={<MapViewPageDriver />} />
              <Route path="/mapview/manager" element={<MapViewPageManager />} />
              <Route path="/search/customer" element={<SearchPageCustomer />} />
              <Route path="/search/manager" element={<SearchPageManager />} />
              <Route path="/LandingPage" element={<LandingPage />} />
              <Route path="/PaymentPage" element={<PaymentPage />} />
            </Routes>
          </Router>
        </Elements>
      )}
    </UserProvider>
  );
}

export default App;
