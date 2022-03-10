import TagEditItem from './TagEditItem';
import { TagContext } from '../TagManager'
import Stack from '@mui/material/Stack'
import { FunctionComponent, useState } from 'react';
import { ColorResult, TwitterPicker } from 'react-color';
import Popover from '@mui/material/Popover'
import { TagManager } from '../TagManager'

type TagEditorState = {
    currName: string,
    anchor: EventTarget | null
}

const TagEditor: FunctionComponent<{}> = (props) => {
    const [state, setState] = useState<TagEditorState>({ currName: '', anchor: null })

    const handleOpenPicker = (target: EventTarget, name: string) => {
        setState({ currName: name, anchor: target })
    }

    const handleChangeComplete = (tagManager: TagManager, colorResult: ColorResult) => {
        tagManager.setTagColor(state.currName, colorResult.hex)
        setState({ ...state, currName: '' })
    }

    return (
        <TagContext.Consumer>
            {tagManager => (<Stack spacing={3}>
                {tagManager.getAllTags().map(tag => (
                    <TagEditItem key={tag.name}
                        name={tag.name}
                        color={tagManager.getColor(tag.name)}
                        onOpenPicker={handleOpenPicker} />))
                }
                <Popover
                    id={'tag-color-picker'}
                    open={state.currName.length > 0}
                    anchorEl={state.anchor as Element}
                    onClose={() => setState({ ...state, currName: '' })}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <TwitterPicker
                        color={tagManager.getColor(state.currName)}
                        onChangeComplete={colorRes => handleChangeComplete(tagManager, colorRes)} />
                </Popover>
            </Stack>)}
        </TagContext.Consumer >)

}

export default TagEditor