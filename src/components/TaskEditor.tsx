import React, { FormEvent, FunctionComponent } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { TaskData } from './Task'

interface TaskEditorProps {
    taskData: TaskData | null, // data of the currently modified task
    onEndEdit: (taskData: TaskData | null) => void // called when the edit form is submitted
}

export const TaskEditor: FunctionComponent<TaskEditorProps> = (props) => {

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const newTaskData : TaskData = {
            ...props.taskData!!,
            name: formData.get("name") as string,
            descr: formData.get("descr") as string
        }
        console.log(newTaskData)
        props.onEndEdit(newTaskData);
    }

    return (
        <div>
            <Dialog
                open={props.taskData !== null}
                onBackdropClick={() => { props.onEndEdit(null) }}
                onClose={() => {props.onEndEdit(null)}}
            >
                <form onSubmit={onSubmit}>
                    <DialogTitle>Edit the task</DialogTitle>
                    <DialogContent>
                        <TextField
                            defaultValue={props.taskData?.name}
                            autoFocus
                            margin="dense"
                            id="name" name="name"
                            label="Title"
                            type="text"
                            fullWidth
                            variant="outlined"
                            required
                        />
                        <TextField
                            defaultValue={props.taskData?.descr}
                            multiline
                            maxRows={4}
                            margin="dense"
                            id="descr" name="descr"
                            label="Description"
                            type="text"
                            fullWidth
                            variant="outlined"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { props.onEndEdit(null) }}>Cancel</Button>
                        <Button type="submit">Save</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div >
    )
}