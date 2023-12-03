export type ITask = {
  description: string;
  value: number;
  checked: boolean;
};

export type IGroupTask = {
  name: string;
  tasks: ITask[];
};

export type IGroupItemProps = {
  setpercent: (num: number) => void;
};
