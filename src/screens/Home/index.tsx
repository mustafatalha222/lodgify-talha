import { useState, useEffect } from "react";
import { Typography, Card } from "antd";
import ProgressBar from "@components/Progress";
import GroupItems from "./GroupItems";
import { useNotification } from "@context/useNotification";

function Home() {
  const [percent, setpercent] = useState(0);
  const { api, contextHolder } = useNotification();

  const openNotification = () => {
    api.success({
      message: "Congratulations",
      description: "Tasks completed",
      duration: 2,
    });
  };

  useEffect(() => {
    if (percent === 100) openNotification();
  }, [percent]);

  return (
    <div className="centered-card">
      {contextHolder}
      <Card
        style={{
          maxWidth: 820,
          width: "100%",
          border: `1px solid #CCCCCC`,
        }}
      >
        <Typography.Title level={1}>Lodgify Grouped Tasks</Typography.Title>
        <ProgressBar percent={percent} />

        <br />
        <GroupItems setpercent={setpercent} />
      </Card>
    </div>
  );
}

export default Home;
