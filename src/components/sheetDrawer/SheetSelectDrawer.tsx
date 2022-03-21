import { FunctionComponent } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import SheetList from './SheetList'
import TopBarSpacer from '../TopBarSpacer'

const MAX_SHEET_COUNT = 100

interface SheetSelectDrawerProps {
    // TODO prop naming while pruning down to the SheetList
    sheetNames: string[]
    onToggleDrawer: (toggle: boolean) => void,
    addSheet: () => void,
    selectSheet: (name: string) => void,
    renameSheet: (oldName: string, newName: string) => void,
    deleteSheet: (name: string) => void,
    selectedSheet: string,
    isDrawerOpen: boolean
}

const SheetSelectDrawer: FunctionComponent<SheetSelectDrawerProps> = (props) => {
    
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Drawer
                anchor={"left"}
                variant={"persistent"}
                open={props.isDrawerOpen}
                onClose={event => props.onToggleDrawer(false)}
                sx={{ backgroundColor: 'red' }}
            >
                <TopBarSpacer />
                <SheetList
                    sheets={props.sheetNames}
                    onAddSheet={props.addSheet}
                    maxSheetCount={MAX_SHEET_COUNT}
                    onRenameSheet={props.renameSheet}
                    onSelectSheet={props.selectSheet}
                    onDeleteSheet={props.deleteSheet}
                    selectedSheet={props.selectedSheet}
                />
            </Drawer>

        </Box>
    )
}
export default SheetSelectDrawer