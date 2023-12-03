import { memo } from "react";
import { Progress, ProgressProps, Typography } from "antd";

type IProgressBar = Omit<ProgressProps, "showInfo"> & {
  percent: number;
};

const ProgressBar = (props: IProgressBar) => {
  const { percent } = props;
  const textGap = `calc(${percent}% - 44px)`;

  return (
    <div style={{ position: "relative" }}>
      <Typography.Text
        style={{
          position: "absolute",
          top: 2,
          zIndex: 1,
          color: "white",
          left: textGap,
        }}
      >
        {percent}%
      </Typography.Text>
      <Progress showInfo={false} strokeWidth={24} {...props} />
    </div>
  );
};

export default memo(ProgressBar);
