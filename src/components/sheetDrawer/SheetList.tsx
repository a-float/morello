import { FunctionComponent } from "react"
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import maxInputLength from '../../maxInputLengths'
import EditableListItem from './EditableListItem'
import { Close } from '@mui/icons-material';
import { grey } from "@mui/material/colors"


type SheetListProps = {
    onAddSheet: () => void,
    onSelectSheet: (name: string) => void,
    onRenameSheet: (oldName: string, newName: string) => void,
    onDeleteSheet: (name: string) => void,
    maxSheetCount: number,
    sheets: string[],
    selectedSheet: string
}

const SheetList: FunctionComponent<SheetListProps> = (props) => {
    const sheetListItems = props.sheets.sort().map(sheetName =>
        // can't remove the last sheet
        <ListItem disablePadding key={sheetName} {...(props.sheets.length === 1 ? {} : {
            secondaryAction:
                <Close onClick={(event) => props.onDeleteSheet(sheetName)}
                    sx={{ color: grey[500], "&:hover": { color: grey[900] } }} fontSize="inherit" />
        })}>
            <EditableListItem
                selected={sheetName === props.selectedSheet}
                onSelectSheet={props.onSelectSheet}
                onRenameSheet={props.onRenameSheet}
                name={sheetName}
                maxLength={maxInputLength.sheetName} />
        </ListItem>
    )
    return (
        <List sx={{ backgroundColor: 'rgba(0,0,0,0)', width: '200px', height: '100vh', boxSizing: 'border-box', margin: 0, overflow: 'auto' }}>
            {sheetListItems}
            {sheetListItems.length < props.maxSheetCount &&
                <ListItem disablePadding>
                    <ListItemButton onClick={props.onAddSheet}>
                        <ListItemText secondary="Add new sheet" />
                    </ListItemButton>
                </ListItem>
            }
        </List>
    )
}

export default SheetList