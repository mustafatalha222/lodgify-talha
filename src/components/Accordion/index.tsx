import { memo } from "react";
import { Collapse, Typography, CollapseProps, Flex } from "antd";
import ArrowDown from "@assets/ArrowDown.svg";
import { COLORS } from "@utils/constants";

const Accordion = (props: CollapseProps) => {
  return (
    <>
      <Collapse
        accordion
        items={props.items}
        expandIconPosition={"end"}
        expandIcon={({ isActive }) => (
          <Flex gap={5} style={{ marginTop: 7 }}>
            <Typography.Text
              style={{
                color: COLORS.lightGrey,
              }}
            >
              {isActive ? "Hide" : "Show"}
            </Typography.Text>
            <img
              src={ArrowDown}
              alt="arrow-icon"
              style={{
                rotate: isActive ? "180deg" : "0deg",
                margin: "4px 5px 0",
                width: 12,
              }}
              loading="lazy"
            />
          </Flex>
        )}
      />
    </>
  );
};

export default memo(Accordion);
