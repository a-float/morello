import { FunctionComponent } from 'react'
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { TagContext } from '../TagManager'

interface MultipleTagSelectProps {
  tags: string[],
}

export const MultipleTagSelect: FunctionComponent<MultipleTagSelectProps> = (props) => {
  return (
    <div>
      <FormControl sx={{ my: 1, width: '100%' }}>
        <InputLabel id="demo-multiple-chip-label">Tags</InputLabel>
        <TagContext.Consumer>
          {tagManager => (<Select
            id="mutliple-tag-select"
            multiple
            defaultValue={props.tags}
            input={<OutlinedInput id="tag-input" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((name) => (
                  <Chip key={name} label={name} sx={{ backgroundColor: tagManager.getColor(name) }} />
                ))}
              </Box>
            )}
          >

            {tagManager.getTags().map(t => t.name).map(tag => (
              <MenuItem
                key={tag}
                value={tag}
              >
                {tag}
              </MenuItem>
            ))}
          </Select>)
          }
        </TagContext.Consumer>
      </FormControl>
    </div>
  );
}