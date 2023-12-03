import GroupItems from "@screens/Home/GroupItems";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

const user = userEvent.setup();

const TASKS = [
  {
    description: "Add name and surname",
    value: 10,
    checked: true,
  },
  {
    description: "Add email",
    value: 15,
    checked: false,
  },
];
const GROUP_INFO = [
  {
    name: "General Info",
    tasks: TASKS,
  },
];

const setup = () => {
  const setpercentMock = vi.fn();
  const { container } = render(<GroupItems setpercent={setpercentMock} />);
  return {
    container,
  };
};

vi.mock("@utils/api", () => ({
  fetchTasks: vi.fn(() => Promise.resolve(GROUP_INFO)),
}));

test("renders loading skeleton when data is not yet fetched", () => {
  const { container } = setup();
  const skeletonInput = container.querySelector(".ant-skeleton");
  expect(skeletonInput).toBeInTheDocument();
});

describe("GroupItems Component after data", () => {
  beforeEach(async () => {
    setup();
    const expandIcon = await screen.findByText(/show/i);
    await user.click(expandIcon);
  });

  test("renders accordion with correct data after fetching", async () => {
    const heading = await screen.findByText(GROUP_INFO[0].name);
    expect(heading).toBeInTheDocument();
  });

  test("renders checkboxes with correct values and checked states", async () => {
    const checkbox1 = screen.getByLabelText(TASKS[0].description);
    const checkbox2 = screen.getByLabelText(TASKS[1].description);
    expect(checkbox1).toBeChecked();
    expect(checkbox2).not.toBeChecked();
  });

  test("toggles the checkbox state on click", async () => {
    const checkbox1 = screen.getByLabelText(TASKS[0].description);
    await user.click(checkbox1);
    expect(checkbox1).not.toBeChecked();
  });
});
