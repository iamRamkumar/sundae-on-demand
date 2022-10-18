import React, { useState } from "react";
import axios from "axios";

import { useEffect } from "react";
import { Button } from "react-bootstrap";

import AlertBanner from "../common/AlertBanner";
import { useOrderDetails } from "../../contexts/OrderDetails";

export default function OrderConfirmation(props) {
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(false);
  const { setOrderPhase } = props;
  const { resetOrder } = useOrderDetails();
  useEffect(() => {
    axios
      .post(`http://localhost:3030/order`)
      .then((response) => setOrderNumber(response.data.orderNumber))
      .catch((error) => {
        setError(true);
      });
  }, []);
  if (error) {
    return <AlertBanner />;
  }
  return (
    <>
      {orderNumber ? (
        <div>
          <h1>Thank you</h1>
          <p>your order number is {orderNumber}</p>
          <p style={{ fontSize: "50%" }}>
            as per our terms and conditions, nothing will happen now
          </p>
          <Button
            onClick={() => {
              resetOrder();
              setOrderPhase("inProgress");
            }}
          >
            create new order
          </Button>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
}
