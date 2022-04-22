import { FunctionComponent, useContext } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import SheetList from './SheetList'
import TopBarSpacer from '../TopBarSpacer'
import { WindowSizeContext } from '../../App'
import { SheetAction, SheetActionType } from '../../logic/sheets/sheetTypes'

const MAX_SHEET_COUNT = 100
export const SHEET_WIDTH = 230 // TODO bag constant global width

interface SheetSelectDrawerProps {
    sheetNames: string[]
    onToggleDrawer: (toggle: boolean) => void,
    sheetDispatch: React.Dispatch<SheetAction>,
    selectedSheet: string,
    isDrawerOpen: boolean
}

const SheetSelectDrawer: FunctionComponent<SheetSelectDrawerProps> = (props) => {
    const isMobile = useContext(WindowSizeContext)
    const addSheet = () => props.sheetDispatch({ type: SheetActionType.ADD, payload: {} })
    const renameSheet = (oldName: string, newName: string) => props.sheetDispatch({ type: SheetActionType.RENAME, payload: { oldName, newName } })
    const selectSheet = (sheetName: string) => props.sheetDispatch({ type: SheetActionType.SELECT, payload: { sheetName } })
    const deleteSheet = (sheetName: string) => props.sheetDispatch({ type: SheetActionType.DELETE, payload: { sheetName } })

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Drawer
                anchor={"left"}
                variant={isMobile ? "temporary" : "persistent"}
                open={props.isDrawerOpen}
                onClose={_ => props.onToggleDrawer(false)}
            >
                <TopBarSpacer />
                <SheetList
                    sheets={props.sheetNames}
                    onAddSheet={addSheet}
                    maxSheetCount={MAX_SHEET_COUNT}
                    onRenameSheet={renameSheet}
                    onSelectSheet={selectSheet}
                    onDeleteSheet={deleteSheet}
                    selectedSheet={props.selectedSheet}
                />
            </Drawer>

        </Box>
    )
}
export default SheetSelectDrawer