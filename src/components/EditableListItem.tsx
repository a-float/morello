import React, { ChangeEvent, FunctionComponent, useState } from 'react'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import TextField from '@mui/material/TextField'

type EditableListItemProps = {
    name: string,
    onRenameSheet: (oldName: string, newName: string) => void,
    onSelectSheet: (sheetName: string) => void
} & React.ComponentProps<typeof ListItemButton>

export const EditableListItem: FunctionComponent<EditableListItemProps> = (props) => {
    const { name, onRenameSheet, onSelectSheet, ...rest } = props
    const [inputValue, setInputValue] = useState(name)
    const [editable, setEditable] = useState(false)

    const makeEditable = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => { event.stopPropagation(); setEditable(true) }
    const handleNameChange = (event: ChangeEvent<any>) => { setInputValue(event.target.value) }

    const completeEdit = () => {
        setEditable(false);
        onRenameSheet(name, inputValue)
    }

    const stopEdit = () => {
        setEditable(false);
        setInputValue(name)
    }

    const handleKeyPress = (event: React.KeyboardEvent) => {
        event.stopPropagation()
        if (event.key === 'Enter') {
            completeEdit()
        } else if (event.code === 'Escape') {
            stopEdit()
        }
    }

    return (
        <ListItemButton {...rest} onClick={(event) => onSelectSheet(name)} onDoubleClick={makeEditable}>
            {!editable ?
                <ListItemText primary={inputValue} />
                :
                <TextField
                    autoFocus
                    id='column-name-input'
                    label="Sheet Name"
                    value={inputValue}
                    size='small'
                    variant='outlined'
                    onBlur={completeEdit}
                    onChange={handleNameChange}
                    onKeyDown={handleKeyPress}
                />
            }
        </ListItemButton>
    )
}