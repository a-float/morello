import { Component } from 'react'
import { TaskDisplay } from './TaskDisplay'
import { SheetData, columns, tasks } from '../database'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import SheetList from './SheetList'
import TopBarSpacer from './TopBarSpacer'

const MAX_SHEET_COUNT = 30
const LOCAL_STORAGE_KEY = "MyToDO"

interface SheetManagerProps {
    onToggleDrawer: (toggle: boolean) => void,
    isDrawerOpen: boolean
}
interface SheetManagerState {
    sheets: {
        [key: string]: SheetData
    },
    currentSheet: string
}

class SheetManager extends Component<SheetManagerProps, SheetManagerState>{
    state: SheetManagerState = {
        sheets: { 'Basic sheet': { columns, tasks } }, // TODO change the initialization
        currentSheet: 'Basic sheet',
    }

    componentDidMount() {
        const storage = window.localStorage
        const data = storage.getItem(LOCAL_STORAGE_KEY)
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
            console.error(`tried to select ${sheetName} but such sheet doesn't exist.`)
        }
    }

    // TODO handle no sheets
    handleDeleteSheet = (sheetName: string) => {
        const index = Object.keys(this.state.sheets).sort().indexOf(sheetName)
        this.setState(prevState => {
            const newSheets = {};
            delete Object.assign(newSheets, prevState.sheets)[sheetName];
            const newCurrSheet = Object.keys(newSheets).sort()[index === 0 ? 0 : index - 1]
            return {
                ...prevState,
                sheets: newSheets,
                currentSheet: newCurrSheet
            }
        })
    }

    render() {
        const sheetData = this.state.sheets[this.state.currentSheet]
        return (
            <Box sx={{ flexGrow: 1 }}>
                <Drawer
                    anchor={"left"}
                    variant={"persistent"}
                    open={this.props.isDrawerOpen}
                    onClose={event => this.props.onToggleDrawer(false)}
                    sx={{ backgroundColor: 'red' }}
                >
                    <TopBarSpacer />
                    <SheetList
                        sheets={this.state.sheets}
                        onAddSheet={this.addSheet}
                        maxSheetCount={MAX_SHEET_COUNT}
                        onRenameSheet={this.handleRenameSheet}
                        onSelectSheet={this.handleSelectSheet}
                        onDeleteSheet={this.handleDeleteSheet}
                        selectedSheet={this.state.currentSheet}
                    />
                </Drawer>
                <TaskDisplay // TODO get this out of SheetManager?
                    tasks={sheetData.tasks}
                    columns={sheetData.columns}
                    onChangeSheet={this.updateSheet}
                    widthOffsets={{ left: this.props.isDrawerOpen ? 200 : 0, right: 0 }} />
            </Box>
        )
    }
}

export default SheetManager