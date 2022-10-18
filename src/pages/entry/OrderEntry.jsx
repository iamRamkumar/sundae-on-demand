import { Button } from "react-bootstrap";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utility";
import Options from "./Options";

export default function OrderEntry(props) {
  const { totals } = useOrderDetails();
  const { setOrderPhase } = props;
  return (
    <>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {formatCurrency(totals.scoops + totals.toppings)}</h2>
      <Button onClick={() => setOrderPhase("review")}>Order Sundae!</Button>
    </>
  );
}
