import React, { ChangeEvent, FunctionComponent, useState } from 'react'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import TextField from '@mui/material/TextField'

type EditableListItemProps = {
    allNames: string[],
    name: string,
    maxLength: number
    onRenameSheet: (oldName: string, newName: string) => void,
    onSelectSheet: (sheetName: string) => void
} & React.ComponentProps<typeof ListItemButton>

const EditableListItem: FunctionComponent<EditableListItemProps> = (props) => {
    const { name, allNames, onRenameSheet, onSelectSheet, ...rest } = props
    const [inputValue, setInputValue] = useState(name)
    const [editable, setEditable] = useState(false)
    const [error, setError] = useState("")

    const makeEditable = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => { setEditable(true) }
    const handleNameChange = (event: ChangeEvent<any>) => { setInputValue(event.target.value) }

    const completeEdit = () => {
        if (name !== inputValue && allNames.includes(inputValue)) {
            setError("Duplicate name")
            // TODO error is not actually displayed
            // duplicate sheet names are not allowed though
            setEditable(false)
        } else {
            setEditable(false);
            onRenameSheet(name, inputValue)
        }
    }

    const cancelEdit = () => {
        setEditable(false);
        setInputValue(name)
        setError("")
    }

    const handleKeyPress = (event: React.KeyboardEvent) => {
        event.stopPropagation()
        if (event.key === 'Enter') {
            completeEdit()
        } else if (event.code === 'Escape') {
            cancelEdit()
        }
    }

    return (
        <ListItemButton {...rest} onClick={() => onSelectSheet(name)} onDoubleClick={makeEditable}>
            {!editable ?
                <ListItemText sx={{ wordBreak: "break-word" }} primary={name} />
                :
                <TextField
                    error={Boolean(error)}
                    helperText={error}
                    autoFocus
                    id='column-name-input'
                    label="Sheet Name"
                    value={inputValue}
                    size='small'
                    variant='outlined'
                    onBlur={completeEdit}
                    onChange={handleNameChange}
                    onKeyDown={handleKeyPress}
                    inputProps={{ maxLength: props.maxLength }}
                />
            }
        </ListItemButton>
    )
}

export default EditableListItem