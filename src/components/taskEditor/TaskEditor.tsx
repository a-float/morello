import { FormEvent, FunctionComponent, FocusEvent} from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { TaskData } from '../tasks/Task'
import { MultipleTagSelect } from './MultipleTagSelect'

interface TaskEditorProps {
    isOpen: boolean,
    taskData: TaskData | null, // data of the currently modified task
    onEndEdit: (taskData: TaskData | null) => void // called when the edit form is submitted
}

export const TaskEditor: FunctionComponent<TaskEditorProps> = (props) => {
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const tagInputValue = (e.currentTarget?.querySelector('#tag-input') as HTMLInputElement).value
        const tagIds = tagInputValue === '' ? [] : tagInputValue.split(',').map(Number)
        tagIds.sort()

        const newTaskData: TaskData = {
            ...props.taskData!!,
            name: formData.get("name") as string,
            descr: formData.get("descr") as string,
            tagIds
        }
        props.onEndEdit(newTaskData);
    }

    const handleFocus = (event: FocusEvent<any>) => {event.target.select() }

    return (
        <div>
            <Dialog
                open={props.isOpen}
                onBackdropClick={() => { props.onEndEdit(null) }}
                onClose={() => { props.onEndEdit(null) }}
                fullWidth
            >
                <form onSubmit={onSubmit}>
                    <DialogTitle>Edit the task</DialogTitle>
                    <DialogContent>
                        <TextField
                            defaultValue={props.taskData?.name}
                            autoFocus
                            onFocus={handleFocus}
                            margin="dense"
                            id="name" name="name"
                            label="Title"
                            type="text"
                            fullWidth
                            variant="outlined"
                            required
                        />
                        <MultipleTagSelect tags={props.taskData?.tagIds || []} />
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