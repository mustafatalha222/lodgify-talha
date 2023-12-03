import { NotificationProvider } from "@context/useNotification";
import Home from "@screens/Home";
import { render, screen } from "@testing-library/react";

const setup = () => {
  const { container } = render(
    <NotificationProvider>
      <Home />
    </NotificationProvider>
  );
  return {
    container,
  };
};

describe("Home Page", () => {
  test("check for Heading", async () => {
    setup();
    const heading = screen.getByRole("heading", {
      name: /lodgify/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test("check for progress value to be 0% on start", async () => {
    setup();
    const zeroPercent = screen.queryByText("0%");
    expect(zeroPercent).toBeInTheDocument();
  });

  test("check for skeleton view", async () => {
    const { container } = setup();
    const skeletonInput = container.querySelector(".ant-skeleton");
    expect(skeletonInput).toBeInTheDocument();
  });
});
