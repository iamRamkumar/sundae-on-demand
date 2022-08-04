import { render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import { userEvent } from "@testing-library/user-event";

test("Initial Conditions", () => {
  render(<SummaryForm />);
  const checkBox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  expect(checkBox).not.toBeChecked();

  const confirmButton = screen.getByRole("button", {
    name: /confirm order/i,
  });
  expect(confirmButton).toBeDisabled();
});

test("checkbox check disable and enable button", () => {
  render(<SummaryForm />);

  const checkBox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const confirmButton = screen.getByRole("button", { name: /confirm order/i });

  userEvent.click(checkBox);

  expect(confirmButton).toBeEnabled();

  userEvent.click(checkBox);
  expect(confirmButton).toBeDisabled();
});
