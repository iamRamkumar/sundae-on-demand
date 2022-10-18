import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";

import OrderEntry from "../OrderEntry";
import { server } from "../../../mocks/server";

test("handles error for scoops and toppings routes", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry setOrderPhase={jest.fn()} />);
  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});

test("check order button disable when no scoops is chosen", async () => {
  render(<OrderEntry setOrderPhase={jest.fn()} />);
  // find order button
  const orderSumaryButton = await screen.findByRole("button", {
    name: /order sundae/i,
  });
  expect(orderSumaryButton).toBeDisabled();

  // add ice scoops
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await userEvent.clear(vanillaInput);
  await userEvent.type(vanillaInput, "1");

  expect(orderSumaryButton).toBeEnabled();

  await userEvent.clear(vanillaInput);
  await userEvent.type(vanillaInput, "0");
  expect(orderSumaryButton).toBeDisabled();
});
