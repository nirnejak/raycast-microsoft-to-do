import { showToast, ToastStyle, getPreferenceValues } from "@raycast/api";
import fetch from "node-fetch";

export const fetchTaskLists = async (): Promise<TaskList[]> => {
  const preference = await getPreferenceValues();
  const response = await fetch("https://graph.microsoft.com/v1.0/me/todo/lists", {
    headers: {
      Authorization: `Bearer ${preference.token}`,
    },
  });
  const data: any = await response.json();

  if (data.error) {
    showToast(ToastStyle.Failure, "Error", "Something went wrong");
    console.log(data);
    return [];
  } else {
    return data.value.filter((taskList: TaskList) => taskList.displayName !== "Flagged Emails");
  }
};

export const createTodo = async (task: TaskForm): Promise<TaskResponse> => {
  const preference = await getPreferenceValues();

  const body: any = {
    title: task.title,
    body: {
      content: task.content,
      contentType: "text",
    },
    importance: task.importance,
  };

  if (task.dueDateTime) {
    body.dueDateTime = {
      dateTime: task.dueDateTime,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  }

  if (task.isComplete) {
    body.status = "completed";
  }

  const response = await fetch(`https://graph.microsoft.com/v1.0/me/todo/lists/${task.taskList}/tasks`, {
    headers: {
      Authorization: `Bearer ${preference.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    method: "POST",
  });
  const data: any = await response.json();

  if (data.error) {
    showToast(ToastStyle.Failure, "Error", "Something went wrong");
    console.log(data);
    return data;
  } else {
    return data;
  }
};
