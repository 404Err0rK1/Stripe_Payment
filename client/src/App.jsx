import React, { useState, useEffect } from "react";
import iPhone from "./assets/15Pro.png";
import "./App.css";

const ProductDisplay = () => (
  <section className="container">
    <div className="product">
      <img src={iPhone} alt="The cover of Stubborn Attachments" />
      <div className="description">
        <h3>iPhone 15 Pro</h3>
        <h5>$580.99</h5>
      </div>
    </div>
    <form action="http://localhost:8000/create-checkout-session" method="POST">
      <button type="submit">Checkout</button>
    </form>
  </section>
);

const Message = ({ message, setMessage }) => (
  <section>
    <p>{message}</p>
    <button onClick={() => setMessage("")}>Continue Shopping</button>
  </section>
);

export default function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? (
    <Message message={message} setMessage={setMessage} />
  ) : (
    <ProductDisplay />
  );
}
