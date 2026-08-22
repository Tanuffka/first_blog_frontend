import { useState } from 'react';
import type { SyntheticEvent } from 'react';
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

  const trimmedTagInputValue = tagInputValue.trim();

  const [debouncedTagInputValue] = useDebounce(trimmedTagInputValue, 500);

  const { data: availableTags = [], isFetching } = useSearchTags(
    debouncedTagInputValue,
  );

  const handleFilterChange = (_: SyntheticEvent, selectedOptions: string[]) => {
    const validTags = selectedOptions
      .map((tag) => tag.trim())
      .filter((tag) => tag.length >= 3);

    const uniqueTagNames = Array.from(new Set(validTags));
    setSelectedTags(uniqueTagNames);
    onChange(uniqueTagNames);
  };
  const isTagsDropdownOpen =
    trimmedTagInputValue.length >= 3 && availableTags.length > 0;

  return (
    <Autocomplete
      multiple
      freeSolo
      fullWidth
      value={selectedTags}
      options={availableTags}
      open={isTagsDropdownOpen}
      inputValue={tagInputValue}
      renderOption={({ key, ...restOptionProps }, option) => {
        return (
          <li key={key} {...restOptionProps}>
            {option}
          </li>
        );
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
                    {isFetching && (
                      <CircularProgress size={20} color="inherit" />
                    )}
                    {inputParams.InputProps.endAdornment}
                  </>
                ),
              },
            }}
          />
        );
      }}
      onChange={handleFilterChange}
      onInputChange={(_, newInputValue) => setTagInputValue(newInputValue)}
    />
  );
}
