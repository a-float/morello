import React, { useReducer } from 'react'
import { SheetAction, SheetActionType, SheetData } from './sheetTypes'

const defaultColumns = [{ name: "Done", id: 0 }, { name: "In Progress", id: 1 }, { name: "To Do", id: 2 }]
const defaultState: SheetState = {
    sheets: {
        'My first todo sheet': {
            columns: [...defaultColumns],
            tasks: [
                { id: "0", columnId: 0, name: "Arrive", descr: "Happy to see you c:", tagIds: [] },
                { id: "1", columnId: 1, name: "Look around!", descr: "Take your time", tagIds: [] },
                { id: "2", columnId: 2, name: "Try draggin tasks to other columns", tagIds: [1] },
                { id: "3", columnId: 2, name: "Edit?", descr: "Double click on tasks or column names to edit them", tagIds: [3, 4, 5] },
                { id: "4", columnId: 2, name: "Click on the cog icon to customize the theme", tagIds: [2] },
                { id: "5", columnId: 2, name: "Enjoy!", tagIds: [3] },
            ]
        }
    },
    currentSheet: 'My first todo sheet'
}

export type SheetState = {
    sheets: {
        [key: string]: SheetData
    },
    currentSheet: string
}

export function useSheets(): [SheetState, React.Dispatch<SheetAction>] {

    const sheetReducer = (state: SheetState, action: SheetAction): SheetState => {
        let newSheets = {}
        switch (action.type) {
            case SheetActionType.ADD:
                let newSheetNum = Object.keys(state.sheets).length + 1
                const getName = (i: number) => "Sheet " + i
                while (getName(newSheetNum) in state.sheets) {
                    newSheetNum += 1
                }
                return ({
                    ...state,
                    sheets: {
                        ...state.sheets,
                        [getName(newSheetNum)]: { columns: defaultColumns, tasks: [] }
                    }
                })
            case SheetActionType.DELETE:
                const index = Object.keys(state.sheets).sort().indexOf(action.payload.sheetName)
                newSheets = {};
                delete Object.assign(newSheets, state.sheets)[action.payload.sheetName];
                const newCurrSheet = Object.keys(newSheets).sort()[index === 0 ? 0 : index - 1]
                return {
                    ...state,
                    sheets: newSheets,
                    currentSheet: newCurrSheet
                }
            case SheetActionType.RENAME:
                const { oldName, newName } = action.payload
                if (oldName === newName) return state
                console.log(Object.keys(state.sheets))
                if (Object.keys(state.sheets).includes(newName)) return state // don't allow overwriting other sheets
                newSheets = {};
                delete Object.assign(newSheets, state.sheets, { [newName]: state.sheets[oldName] })[oldName];
                return {
                    ...state,
                    sheets: newSheets,
                    currentSheet: newName
                }
            case SheetActionType.SELECT:
                const { sheetName } = action.payload
                if (state.currentSheet === sheetName) return state
                if (state.sheets.hasOwnProperty(sheetName)) {
                    return { ...state, currentSheet: sheetName }
                } else {    // TODO is it necessary?
                    console.error(`tried to select ${sheetName} but such sheet doesn't exist.`)
                    return state
                }
            case SheetActionType.UPDATE:
                return {
                    ...state,
                    sheets: {
                        ...state.sheets,
                        [state.currentSheet]: action.payload.data
                    }
                }
            case SheetActionType.REMOVE_TAG:
                const copy: { [key: string]: SheetData } = {}
                for (const sheetName of [...Object.keys(state.sheets)]) {
                    copy[sheetName] = {
                        columns: [...state.sheets[sheetName].columns],
                        tasks: [...state.sheets[sheetName].tasks]
                    }
                    for (const task of copy[sheetName].tasks) {
                        task.tagIds = task.tagIds.filter(tag => tag !== action.payload.tagId)
                    }
                }
                return {
                    ...state,
                    currentSheet: state.currentSheet,
                    sheets: copy
                }
            case SheetActionType.FETCH:
                return action.payload.data
            default:
                return state;
        }
    }

    const [sheets, dispatch] = useReducer(sheetReducer, defaultState)
    return [sheets, dispatch]
}