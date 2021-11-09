import React from 'react'
import { TaskDisplay } from './TaskDisplay'
import { SheetData, columns, tasks } from '../database'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import { EditableListItem } from './EditableListItem'
const MAX_SHEET_COUNT = 30
const LOCAL_STORAGE_KEY = "MyToDO"

interface SheetManagerProps {

}
interface SheetManagerState {
    sheets: {
        [key: string]: SheetData
    }
    currentSheet: string
}
export class SheetManager extends React.Component<SheetManagerProps, SheetManagerState>{
    state: SheetManagerState = {
        sheets: { 'Basic sheet': { columns, tasks } }, // TODO change the initialization
        currentSheet: 'Basic sheet'
    }

    componentDidMount() {
        const storage = window.localStorage
        const data = storage.getItem(LOCAL_STORAGE_KEY)
        console.log("Mounting sheet manager ", data)
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
            console.log('Name hasn\'t been changed');
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
            this.setState({ currentSheet: sheetName })
        } else {
            console.error(`${sheetName} has been selected, but such sheet doesn't exist.`)
        }
    }

    render() {
        const sheetData = this.state.sheets[this.state.currentSheet]
        const sheetListItems = Object.keys(this.state.sheets).map(sheetName =>
            <ListItem disablePadding key={sheetName}>
                <EditableListItem
                    selected={sheetName === this.state.currentSheet}
                    onSelectSheet={this.handleSelectSheet}
                    onRenameSheet={this.handleRenameSheet}
                    name={sheetName} />
            </ListItem>
        )
        return (
            <Stack direction='row'> {/*TODO change horizontal layout*/}
                <Box sx={{ width: '10%', minWidth: 150 }}>
                    <nav aria-label="sheet labels">
                        <List sx={{ height: '100vh', boxSizing: 'border-box', margin: 0, overflow: 'auto' }} subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                Todo Sheets
                            </ListSubheader>
                        }>
                            {sheetListItems}
                            {Object.keys(this.state.sheets).length < MAX_SHEET_COUNT &&
                                <ListItem disablePadding>
                                    <ListItemButton onClick={this.addSheet}>
                                        <ListItemText secondary="Add new sheet" />
                                    </ListItemButton>
                                </ListItem>
                            }
                        </List>
                    </nav>
                </Box>
                <Box sx={{ width: '90%', paddingTop: '0.5em' }}>
                    <TaskDisplay
                        tasks={sheetData.tasks}
                        columns={sheetData.columns}
                        onChangeSheet={this.updateSheet} />
                </Box>
            </Stack>
        )
    }
}
