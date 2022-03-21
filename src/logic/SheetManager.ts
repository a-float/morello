import { SheetData } from "../database"
import { SheetState } from '../App'

export default class SheetManager {
    static defaultColumns = [{ name: "Done", id: 0 }, { name: "In Progress", id: 1 }, { name: "To Do", id: 2 }]
    sheetState: SheetState
    setSheetState: React.Dispatch<React.SetStateAction<SheetState>>
    constructor(state: SheetState, setState: React.Dispatch<React.SetStateAction<SheetState>>) {
        this.sheetState = state
        this.setSheetState = setState
    }

    updateSheet = (data: SheetData) => {
        this.setSheetState(prevState => ({
            ...prevState,
            sheets: {
                ...prevState.sheets,
                [prevState.currentSheet]: data
            }
        }))
    }

    addSheet = () => {
        let newSheetNum = Object.keys(this.sheetState.sheets).length + 1
        const getName = (i: number) => "Sheet " + i
        while (getName(newSheetNum) in this.sheetState.sheets) {
            newSheetNum += 1
        }
        this.setSheetState(prevState => ({
            ...prevState,
            sheets: {
                ...prevState.sheets,
                [getName(newSheetNum)]: { columns: SheetManager.defaultColumns, tasks: [] }
            }
        }))
    }

    renameSheet = (oldName: string, newName: string) => {
        if (oldName === newName) return
        this.setSheetState(prevState => {
            const newSheets = {};
            delete Object.assign(newSheets, prevState.sheets, { [newName]: prevState.sheets[oldName] })[oldName];
            return {
                sheets: newSheets,
                currentSheet: newName
            }
        })
    }

    selectSheet = (sheetName: string) => {
        if (this.sheetState.currentSheet === sheetName) return // don't rerender on reselect
        if (this.sheetState.sheets.hasOwnProperty(sheetName)) {
            this.setSheetState(prevState => ({ ...prevState, currentSheet: sheetName }))
        } else {    // TODO is it necessary?
            console.error(`tried to select ${sheetName} but such sheet doesn't exist.`)
        }
    }

    // TODO handle no sheets
    deleteSheet = (sheetName: string) => {
        const index = Object.keys(this.sheetState.sheets).sort().indexOf(sheetName)
        this.setSheetState(prevState => {
            const newSheets = {};
            delete Object.assign(newSheets, prevState.sheets)[sheetName];
            const newCurrSheet = Object.keys(newSheets).sort()[index === 0 ? 0 : index - 1]
            return {
                sheets: newSheets,
                currentSheet: newCurrSheet
            }
        })
    }
}