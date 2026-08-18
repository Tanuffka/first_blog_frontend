import { useState } from 'react';
import { useDebounce } from 'use-debounce';

import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';

import { useSearchTags } from 'src/hooks/useSearchTags';

interface ArticleTagsFilterProps {
  onChange: (tags: string[]) => void;
}

export default function TagsInputFilter({ onChange }: ArticleTagsFilterProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagInputValue, setTagInputValue] = useState<string>('');
  const [debouncedTagInput] = useDebounce(tagInputValue, 500);

  const { data: availableTags = [], isLoading } =
    useSearchTags(debouncedTagInput);

  return (
    <Autocomplete
      multiple
      freeSolo
      fullWidth
      loading={isLoading}
      options={availableTags}
      value={selectedTags}
      inputValue={tagInputValue}
      onInputChange={(_, newInputValue) => setTagInputValue(newInputValue)}
      open={tagInputValue.trim().length >= 3}
      renderOption={(optionProps, option) => (
        <li {...optionProps} key={optionProps.key}>
          {option}
        </li>
      )}
      onChange={(_, selectedOptions) => {
        const validTags = selectedOptions
          .map((tag) => tag.trim())
          .filter((tag) => tag.length >= 3);

        const uniqueTagNames = Array.from(new Set(validTags));
        setSelectedTags(uniqueTagNames);
        onChange(uniqueTagNames);
      }}
      renderInput={(inputParams) => {
        return (
          <TextField
            {...inputParams}
            label="Search (by tags)"
            placeholder="Min. 3 characters"
            slotProps={{
              input: {
                ...inputParams.InputProps,
                endAdornment: (
                  <>
                    {isLoading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {inputParams.InputProps.endAdornment}
                  </>
                ),
              },
            }}
          />
        );
      }}
    />
  );
}
