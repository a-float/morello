import { TaskData } from "../../components/tasks/Task"
import { ColumnData } from "../../temps"
import { SheetState } from "./useSheets"

export interface SheetData {
    columns: ColumnData[],
    tasks: TaskData[]
}

export interface Action {
    type: string,
    payload: object
}

export type SheetAction =
    | AddSheetAction
    | UpdateSheetAction
    | RenameSheetAction
    | DeleteSheetAction
    | SelectSheetAction
    | FetchSheetAction
    | RemoveTagSheetAction

export enum SheetActionType {
    ADD = "ADD",
    UPDATE = "UPDATE",
    RENAME = "RENAME",
    SELECT = "SELECT",
    DELETE = "DELETE",
    FETCH = "FETCH",
    REMOVE_TAG = "REMOVE_TAG"
}

export interface AddSheetAction extends Action {
    type: SheetActionType.ADD,
    payload: {}
}
export interface UpdateSheetAction extends Action {
    type: SheetActionType.UPDATE,
    payload: { data: SheetData }
}
export interface RenameSheetAction extends Action {
    type: SheetActionType.RENAME,
    payload: { oldName: string, newName: string }
}
export interface DeleteSheetAction extends Action {
    type: SheetActionType.DELETE,
    payload: { sheetName: string }
}
export interface SelectSheetAction extends Action {
    type: SheetActionType.SELECT,
    payload: { sheetName: string }
}
export interface FetchSheetAction extends Action {
    type: SheetActionType.FETCH,
    payload: { data: SheetState }
}
export interface RemoveTagSheetAction extends Action {
    type: SheetActionType.REMOVE_TAG,
    payload: { tagId: number }
}
