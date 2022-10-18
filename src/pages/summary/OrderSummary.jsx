import React from "react";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utility";
import SummaryForm from "./SummaryForm";

export default function OrderSummary(props) {
  const { totals, optionCounts } = useOrderDetails();
  const { setOrderPhase } = props;
  const scoopArray = Object.entries(optionCounts.scoops);
  const scoopList = scoopArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));
  const toppingArray = Object.keys(optionCounts.toppings);
  const toppingList = toppingArray.map((key) => <li key={key}>{key}</li>);
  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopList}</ul>
      {totals.toppings > 0 && (
        <>
          <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
          <ul>{toppingList}</ul>
        </>
      )}

      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
}
