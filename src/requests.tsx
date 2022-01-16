import { getPreferenceValues } from "@raycast/api";
import fetch from "node-fetch";

export const fetchTaskLists = async (): Promise<TaskList[]> => {
  const preference = await getPreferenceValues();
  const response = await fetch("https://graph.microsoft.com/v1.0/me/todo/lists", {
    headers: {
      Authorization: `Bearer ${preference.token}`,
    },
  });
  const data: any = await response.json();
  if (data.value) {
    return data.value.filter((taskList: TaskList) => taskList.displayName !== "Flagged Emails");
  } else {
    return [];
  }
};

export const createTodo = async (task: TaskForm): Promise<TaskResponse> => {
  const preference = await getPreferenceValues();
  const response = await fetch(`https://graph.microsoft.com/v1.0/me/todo/lists/${task.taskList}/tasks`, {
    headers: {
      Authorization: `Bearer ${preference.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: task.title,
      body: {
        content: task.content,
        contentType: "text",
      },
    }),
    method: "POST",
  });
  const data: any = await response.json();
  return data;
};
