import React from 'react'
import { TaskDisplay } from './TaskDisplay'
import { SheetData, columns, tasks } from '../database'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import SheetList from './SheetList'

const MAX_SHEET_COUNT = 30
const LOCAL_STORAGE_KEY = "MyToDO"

interface SheetManagerProps {

}
interface SheetManagerState {
    sheets: {
        [key: string]: SheetData
    }
    currentSheet: string,
    isDrawerOpen: boolean
}
export class SheetManager extends React.Component<SheetManagerProps, SheetManagerState>{
    state: SheetManagerState = {
        sheets: { 'Basic sheet': { columns, tasks } }, // TODO change the initialization
        currentSheet: 'Basic sheet',
        isDrawerOpen: false,
    }

    componentDidMount() {
        const storage = window.localStorage
        const data = storage.getItem(LOCAL_STORAGE_KEY)
        // console.log("Mounting sheet manager ", data)
        if (data !== null) {
            this.setState(JSON.parse(data))
        }
    }

    componentDidUpdate(prevProps: SheetManagerProps, prevState: SheetManagerState) {
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.state))
    }

    updateSheet = (data: SheetData) => {
        this.setState(prevState => ({
            ...prevState,
            sheets: {
                ...prevState.sheets,
                [prevState.currentSheet]: data
            }
        }))
    }

    addSheet = () => {
        let newSheetNum = Object.keys(this.state.sheets).length + 1
        const getName = (i: number) => "Sheet " + i
        while (getName(newSheetNum) in this.state.sheets) {
            newSheetNum += 1
        }
        this.setState(prevState => ({
            sheets: { ...prevState.sheets, [getName(newSheetNum)]: { columns: [], tasks: [] } }
        }))
    }

    handleRenameSheet = (oldName: string, newName: string) => {
        if (newName === oldName) {
            console.log("Name hasn't been changed");
            return
        }
        this.setState(prevState => {
            const newSheets = {};
            delete Object.assign(newSheets, prevState.sheets, { [newName]: prevState.sheets[oldName] })[oldName];
            return {
                ...prevState,
                sheets: newSheets,
                currentSheet: newName
            }
        })
    }

    handleSelectSheet = (sheetName: string) => {
        if (sheetName in this.state.sheets) {
            this.setState({ currentSheet: sheetName, isDrawerOpen: false })
        } else {
            console.error(`tried to select ${sheetName} but such sheet doesn't exist.`)
        }
    }

    toggleDrawer(newState: boolean) {
        this.setState({ isDrawerOpen: newState })
    }

    render() {
        const sheetData = this.state.sheets[this.state.currentSheet]
        return (
            <Box sx={{ flex: "auto" }}>
                <Drawer
                    anchor={"left"}
                    open={this.state.isDrawerOpen}
                    onClose={event => this.setState({ isDrawerOpen: false })}
                >
                    <SheetList
                        sheets={this.state.sheets}
                        onAddSheet={this.addSheet}
                        maxSheetCount={MAX_SHEET_COUNT}
                        onRenameSheet={this.handleRenameSheet}
                        onSelectSheet={this.handleSelectSheet}
                        selectedSheet={this.state.currentSheet}
                    />
                </Drawer>
                <TaskDisplay
                    tasks={sheetData.tasks}
                    columns={sheetData.columns}
                    onChangeSheet={this.updateSheet} />
            </Box>
        )
    }
}
