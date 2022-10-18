import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";

import ScoopOption from "../ScoopOption";

test("indicate if scoop-option is not-int or out of range", async () => {
  render(<ScoopOption />);

  const scoopInput = screen.getByRole("spinbutton");

  // check with invalid input
  await userEvent.clear(scoopInput);
  await userEvent.type(scoopInput, "-1");

  expect(scoopInput).toHaveClass("is-invalid");

  await userEvent.clear(scoopInput);
  await userEvent.type(scoopInput, "2.5");

  expect(scoopInput).toHaveClass("is-invalid");

  await userEvent.clear(scoopInput);
  await userEvent.type(scoopInput, "20");

  expect(scoopInput).toHaveClass("is-invalid");

  // check valid input
  await userEvent.clear(scoopInput);
  await userEvent.type(scoopInput, "3");

  expect(scoopInput).not.toHaveClass("is-invalid");
});
