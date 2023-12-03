import { render, screen } from "@testing-library/react";
import ProgressBar from "@components/Progress";

const setup = (percent = 50) => {
  render(<ProgressBar percent={percent} />);
};

describe("Progress Bar component", () => {
  test("should render the ProgressBar component with the specified percentage", () => {
    setup();
    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute("aria-valuenow", "50");
  });

  test("should render the ProgressBar component with the specified value", () => {
    setup(70);
    const valuePercent = screen.queryByText("70%");
    expect(valuePercent).toBeInTheDocument();
  });
});
