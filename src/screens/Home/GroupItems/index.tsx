import { useState, useEffect, useRef, useCallback, memo } from "react";
import Accordion from "@components/Accordion";
import { Checkbox, CollapseProps, Flex, Skeleton, Typography } from "antd";
import List from "@assets/List.svg";
import { fetchTasks } from "@utils/api";
import { IGroupTask, IGroupItemProps, ITask } from "./type";

const createGroupItems = (
  jsonData: IGroupTask[],
  handleCheckboxChange: (str: string) => void
) => {
  return jsonData.map((category) => ({
    key: category.name,
    label: (
      <Flex gap={10}>
        <img src={List} alt="list-icon" loading="lazy" />
        <Typography.Text style={{ fontSize: 18 }}>
          {category.name}
        </Typography.Text>
      </Flex>
    ),
    children: (
      <Flex vertical gap={15} style={{ padding: "0 10px" }}>
        {category.tasks.map((task) => (
          <Checkbox
            key={task.description}
            defaultChecked={task.checked}
            value={task.description}
            onChange={(e) => handleCheckboxChange(e.target.value)}
          >
            {task.description}
          </Checkbox>
        ))}
      </Flex>
    ),
  }));
};

const calculateProgressBar = (totalValues: number, checkedValues: number) => {
  return totalValues > 0 ? ~~((checkedValues * 100) / totalValues) : 0;
};

function calculateValues(tasks: ITask[]) {
  let totalValue = 0;
  let checkedValue = 0;

  for (const task of tasks) {
    totalValue += task.value;
    if (task.checked) {
      checkedValue += task.value;
    }
  }
  const percentage = calculateProgressBar(totalValue, checkedValue);
  return { tasks, percentage };
}

function GroupItems({ setpercent }: IGroupItemProps) {
  const [data, setdata] = useState<CollapseProps["items"]>([]);
  const tasksRef = useRef<ITask[]>();

  useEffect(() => {
    const fetchAsync = async () => {
      const result = await fetchTasks();
      setdata(createGroupItems(result, handleCheckboxChange));
      const _tasks = result.reduce(
        (acc, group) => [...acc, ...group.tasks],
        [] as ITask[]
      );
      const { tasks, percentage } = calculateValues(_tasks);
      tasksRef.current = tasks;
      setpercent(percentage);
    };
    fetchAsync();
  }, []);

  const handleCheckboxChange = useCallback((description: string) => {
    const taskToUpdate = tasksRef.current!.find(
      (task) => task.description === description
    );
    if (!taskToUpdate) return;
    taskToUpdate.checked = !taskToUpdate.checked;

    const { tasks, percentage } = calculateValues(tasksRef.current!);
    tasksRef.current = tasks;
    setpercent(percentage);
  }, []);

  if (!data?.length) return <Skeleton.Input style={{ height: 150 }} block />;
  return (
    <>
      <Accordion items={data} />
    </>
  );
}

export default memo(GroupItems);
