import { TaskData } from "./components/tasks/Task"
// TODO move to the SheetManager?
export const defaultTask =
{
    name: "Task Name",
    descr: "",
    tagIds: []
}
export const columns: string[] = ["Done", "In Progress", "To Do"]
export const tasks: TaskData[] = []

export interface SheetData {
    columns: string[],
    tasks: TaskData[]
}