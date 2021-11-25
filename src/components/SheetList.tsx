import { FunctionComponent } from "react"
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import EditableListItem from './EditableListItem'
import ListSubheader from '@mui/material/ListSubheader'
import { SheetData } from "../database"

type SheetListProps = {
    onAddSheet: () => void,
    onSelectSheet: (name: string) => void,
    onRenameSheet: (oldName: string, newName: string) => void,
    maxSheetCount: number,
    sheets: {[key: string]: SheetData},
    selectedSheet: string
}

const SheetList :FunctionComponent<SheetListProps> = (props) => {
    const sheetListItems = Object.keys(props.sheets).map(sheetName =>
        <ListItem disablePadding key={sheetName}>
            <EditableListItem
                selected={sheetName === props.selectedSheet}
                onSelectSheet={props.onSelectSheet}
                onRenameSheet={props.onRenameSheet}
                name={sheetName} />
        </ListItem>
    )
    return (
        <Box sx={{ width: '10%', minWidth: 150 }}>
            <nav aria-label="sheet labels">
                <List sx={{ height: '100vh', boxSizing: 'border-box', margin: 0, overflow: 'auto' }} subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Todo Sheets
                    </ListSubheader>
                }>
                    {sheetListItems}
                    {sheetListItems.length < props.maxSheetCount &&
                        <ListItem disablePadding>
                            <ListItemButton onClick={props.onAddSheet}>
                                <ListItemText secondary="Add new sheet" />
                            </ListItemButton>
                        </ListItem>
                    }
                </List>
            </nav>
        </Box>
    )
}

export default SheetList