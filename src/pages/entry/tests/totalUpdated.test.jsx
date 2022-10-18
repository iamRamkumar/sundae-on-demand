import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("update scoop subtotal when scoops change", async () => {
  render(<Options optionType="scoops" />);

  // make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await userEvent.clear(vanillaInput);
  await userEvent.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await userEvent.clear(chocolateInput);
  await userEvent.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update toppings subtotal when toppings change", async () => {
  render(<Options optionType="toppings" />);

  // make sure total starts out $0.00
  const toppingtotal = screen.getByText("Toppings total: $", { exact: false });
  expect(toppingtotal).toHaveTextContent("0.00");

  // add cherries and check subtotal
  const peanutCheckBox = await screen.findByRole("checkbox", {
    name: "Peanut butter cups",
  });

  await userEvent.click(peanutCheckBox);
  expect(toppingtotal).toHaveTextContent("1.50");

  const hotFudgeCheckbox = await screen.findByRole("checkbox", {
    name: "Hot fudge",
  });

  await userEvent.click(hotFudgeCheckbox);
  expect(toppingtotal).toHaveTextContent("3.00");

  await userEvent.click(hotFudgeCheckbox);
  expect(toppingtotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  test("grand total updates properly if scoop is added first", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent("0.00");

    // update vanilla scoops to 2 and check the grand
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await userEvent.clear(vanillaInput);
    await userEvent.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("4.00");

    // add cherries and check grand total
    const peanutCheckBox = await screen.findByRole("checkbox", {
      name: "Peanut butter cups",
    });

    await userEvent.click(peanutCheckBox);
    // check grand total
    expect(grandTotal).toHaveTextContent("5.50");
  });
  test("grand total updates properly if topping is added first", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByText("Grand total: $", { exact: false });

    // add cherries and check grand total
    const peanutCheckBox = await screen.findByRole("checkbox", {
      name: "Peanut butter cups",
    });

    await userEvent.click(peanutCheckBox);
    expect(grandTotal).toHaveTextContent("1.50");

    // update vanilla scoops to 2 and check the grand
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await userEvent.clear(vanillaInput);
    await userEvent.type(vanillaInput, "2");

    // check grand total
    expect(grandTotal).toHaveTextContent("5.50");
  });
  test("grand total updates properly if items is removed", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByText("Grand total: $", { exact: false });

    // add cherries and check grand total
    const peanutCheckBox = await screen.findByRole("checkbox", {
      name: "Peanut butter cups",
    });

    await userEvent.click(peanutCheckBox);
    expect(grandTotal).toHaveTextContent("1.50");

    // update vanilla scoops to 2 and check the grand
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await userEvent.clear(vanillaInput);
    await userEvent.type(vanillaInput, "2");

    // check grand total
    expect(grandTotal).toHaveTextContent("5.50");

    // remove 1 scoop of vanilla and check the grand
    await userEvent.clear(vanillaInput);
    await userEvent.type(vanillaInput, "1");

    // check grand
    expect(grandTotal).toHaveTextContent("3.50");

    // remove topping and check the grand
    await userEvent.click(peanutCheckBox);
    expect(grandTotal).toHaveTextContent("2.00");
  });
});
