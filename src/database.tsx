import { TaskData } from "./components/tasks/Task"

export const generateId = () => Math.floor(Math.random() * 10000)

export interface ColumnData {
    name: string,
    id: number
}

export interface SheetData {
    columns: ColumnData[],
    tasks: TaskData[]
}