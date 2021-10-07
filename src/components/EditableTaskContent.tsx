import { Button, TextField, TextFieldProps } from '@mui/material'
import React, { FunctionComponent } from 'react'

type MyTextFieldProps = {
    label: string,
    name: string,
    value: string,
    onChange: (data: {}) => void,
    onEndEdit: () => void
} & TextFieldProps

interface EditableTaskContentProps {
    name: string,
    descr: string,
    onChange: (data: {}) => void
    onEndEdit: () => void
}

const MyTextField: FunctionComponent<MyTextFieldProps> = (props) => {
    return (
        <TextField
            label={props.label}
            value={props.value}
            size="small"
            margin="dense"
            onChange={event => props.onChange({ [props.name]: event.target.value })}
            onFocus={event => event.target.select()}
            autoFocus={props.autoFocus}
            onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === 'Escape') {
                    props.onEndEdit()
                    event.preventDefault()
                    event.stopPropagation()
                }
            }}
        />
    )
}

const EditableTaskContent: FunctionComponent<EditableTaskContentProps> = (props) => {
    return (
        <form action="#" onSubmit={props.onEndEdit}>
            <MyTextField
                label="Task name"
                name="name"
                value={props.name}
                autoFocus
                onChange={props.onChange}
                onEndEdit={props.onEndEdit}
            />
            <MyTextField
                label="Description"
                name="descr"
                value={props.descr}
                onChange={props.onChange}
                onEndEdit={props.onEndEdit}
            />
            <Button variant="outlined" type="submit">Save</Button>
        </form>
    )
}

export default EditableTaskContent
