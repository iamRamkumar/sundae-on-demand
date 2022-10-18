import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

test("order phase for happy path", async () => {
  render(<App />);
  // add ice cream and scoops
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await userEvent.clear(vanillaInput);
  await userEvent.type(vanillaInput, "1");

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await userEvent.clear(chocolateInput);
  await userEvent.type(chocolateInput, "2");

  // add cherries and check grand total
  const peanutCheckBox = await screen.findByRole("checkbox", {
    name: "Peanut butter cups",
  });

  await userEvent.click(peanutCheckBox);

  // find and check order button
  const orderSumaryButton = await screen.findByRole("button", {
    name: /order sundae/i,
  });
  await userEvent.click(orderSumaryButton);

  // check summary information based on order

  // check summary subtotal
  const summaryHeading = screen.getByRole("heading", { name: "Order Summary" });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole("heading", { name: "Scoops: $6.00" });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole("heading", {
    name: "Toppings: $1.50",
  });
  expect(toppingsHeading).toBeInTheDocument();

  // Check summary option items
  expect(screen.getByText("1 Vanilla")).toBeInTheDocument();
  expect(screen.getByText("2 Chocolate")).toBeInTheDocument();
  expect(screen.getByText("Peanut butter cups")).toBeInTheDocument();

  //  -------------------

  // accept terms and conditions and click button to confirm order
  const tcCheckButton = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  await userEvent.click(tcCheckButton);

  const confirmOrderButton = screen.getByRole("button", {
    name: /confirm order/i,
  });
  await userEvent.click(confirmOrderButton);
  const thankyouHeader = await screen.findByRole("heading", {
    name: /thank you/i,
  });
  expect(thankyouHeader).toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();
  // click new order button on the confirmation page
  const newOrderButton = screen.getByRole("button", { name: /new order/i });
  await userEvent.click(newOrderButton);
  // check that scoops and toppings subtotal have been reset
  const scoopTotal = screen.getByText(/scoops total: \$0.00/i);
  expect(scoopTotal).toBeInTheDocument();
  const toppingTotal = screen.getByText(/toppings total: \$0.00/i);
  expect(toppingTotal).toBeInTheDocument();

  await screen.findByRole("spinbutton", { name: "Vanilla" });
  await screen.findByRole("checkbox", { name: "Peanut butter cups" });
});
