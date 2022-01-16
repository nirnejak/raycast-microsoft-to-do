interface TaskList {
  id: string;
  displayName: string;
  isOwner: boolean;
  isShared: boolean;
  wellknownListName: string;
  "@odata.etag": string;
}

interface TaskForm {
  title: string;
  content: string;
  taskList: string;
}

interface ContentBody {
  content: string;
  contentType: string;
}

interface TaskResponse {
  "@odata.context": string;
  "@odata.etag": string;
  importance: string;
  isReminderOn: boolean;
  status: string;
  title: string;
  createdDateTime: string;
  lastModifiedDateTime: string;
  id: string;
  body: ContentBody;
}
