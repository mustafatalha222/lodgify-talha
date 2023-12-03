import { IGroupTask } from "@screens/Home/GroupItems/type";

const API_ENDPOINT =
  "https://gist.githubusercontent.com/huvber/ba0d534f68e34f1be86d7fe7eff92c96/raw/98a91477905ea518222a6d88dd8b475328a632d3/mock-progress";

export const fetchTasks = async (): Promise<IGroupTask[]> => {
  try {
    const response = await fetch(API_ENDPOINT);
    if (!response.ok) throw new Error("Network response was not ok");
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(`Error fetching data: ${error}`);
  }
};
