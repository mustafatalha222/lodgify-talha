import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import Accordion from "@components/Accordion";

const items = [
  {
    key: "1",
    label: "Title 1",
  },
  {
    key: "2",
    label: "Title 2",
  },
];

const user = userEvent.setup();
const setup = () => {
  const { container } = render(<Accordion items={items} />);
  const title1 = screen.getByText(items[0].label);
  return {
    container,
    title1,
  };
};

describe("Accordion Test cases", () => {
  test("check for Buttons length", () => {
    setup();
    const title2 = screen.queryAllByRole("button");
    expect(title2).toHaveLength(2);
  });

  test("renders 1st label with initial collapsed state", () => {
    const { title1 } = setup();
    expect(title1).toBeInTheDocument();
    expect(title1.parentElement).toHaveAttribute("aria-expanded", "false");
  });

  test("expands 1st element on click", async () => {
    const { title1 } = setup();
    await user.click(title1);
    expect(title1.parentElement).toHaveAttribute("aria-expanded", "true");
  });

  test("check for Show and Hide button", async () => {
    setup();
    let checkHideText = screen.queryByText(/hide/i);
    expect(checkHideText).not.toBeInTheDocument();
    const showElements = screen.getAllByText(/show/i);
    const firstShowElement = showElements[0];
    expect(firstShowElement).toBeInTheDocument();
    await user.click(firstShowElement);
    checkHideText = screen.queryByText(/hide/i);
    expect(checkHideText).toBeInTheDocument();
  });
});
