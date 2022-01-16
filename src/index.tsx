import { Form, ActionPanel, SubmitFormAction, showToast, ToastStyle } from "@raycast/api";
import React from "react";

import { fetchTaskLists, createTodo } from "./requests";

export default function Command() {
  const [taskLists, setTaskLists] = React.useState<TaskList[]>([]);

  React.useEffect(() => {
    async function fetchData() {
      const taskListsResponse = await fetchTaskLists();
      setTaskLists(taskListsResponse);
    }
    fetchData();
  }, []);

  async function handleSubmit(values: TaskForm) {
    const data = await createTodo(values);

    if (data.id) {
      showToast(ToastStyle.Success, "Task Created", "Task is successfully created");
    }
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <SubmitFormAction onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField id="title" title="Title" placeholder="Task Title" />
      <Form.TextArea id="content" title="Notes" placeholder="Notes" />
      <Form.Separator />
      <Form.DatePicker id="dueDateTime" title="Due Date" />
      {/* <Form.Checkbox id="isComplete" title="Is Complete" label="Mark This Task Complete" storeValue /> */}
      <Form.Dropdown id="taskList" title="Task List">
        {taskLists.map((task: TaskList) => (
          <Form.DropdownItem key={task.id} value={task.id} title={task.displayName} />
        ))}
      </Form.Dropdown>
    </Form>
  );
}
