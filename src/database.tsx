import { TaskData } from "./components/tasks/Task"

export const defaultTask =
{
    name: "Task Name",
    descr: "",
    tags: []
}
export const columns: string[] = ["Done", "In Progress", "To Do"]
export const tasks: TaskData[] = []

export interface SheetData {
    columns: string[],
    tasks: TaskData[]
}