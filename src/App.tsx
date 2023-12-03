import { ConfigProvider } from "antd";
import { COLORS } from "./utils/constants";
import Home from "./screens/Home";
import { ErrorBoundary } from "@components/ErrorBoundary";
import { NotificationProvider } from "@context/useNotification";

function App() {
  return (
    <ErrorBoundary>
      <NotificationProvider>
        <ConfigProvider
          theme={{
            token: {
              fontSizeHeading1: 22,
              fontWeightStrong: 700,
              colorPrimary: COLORS.success,
              colorPrimaryHover: COLORS.success,
              colorPrimaryBorder: COLORS.successShade,
              fontSize: 16,
            },
            components: {
              Progress: {
                defaultColor: COLORS.success,
                remainingColor: COLORS.successShade,
                colorSuccess: COLORS.success,
              },
              Collapse: {
                headerBg: "transparent",
              },
            },
          }}
        >
          <Home />
        </ConfigProvider>
      </NotificationProvider>
    </ErrorBoundary>
  );
}

export default App;
