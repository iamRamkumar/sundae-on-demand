import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import { rest } from "msw";

import OrderConfimation from "../OrderConfirmation";
import { server } from "../../../mocks/server";

test("handles error for scoops and toppings routes", async () => {
  server.resetHandlers(
    rest.post("http://localhost:3030/order", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderConfimation setOrderPhase={jest.fn()} />);
  await waitFor(async () => {
    const alerts = await screen.findByRole("alert");
    expect(alerts).toHaveTextContent(
      "An unexpected error occured. Please try again later."
    );
  });
});
