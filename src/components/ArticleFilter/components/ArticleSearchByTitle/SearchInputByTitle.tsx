import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import ClearIcon from '@mui/icons-material/Clear';
import { useDebounce } from 'use-debounce';

export interface ArticleSearchByTitleProps {
  onChange: (searchKeyword: string) => void;
  isLoading?: boolean;
}

export default function SearchInputByTitle({
  onChange,
  isLoading = false,
}: ArticleSearchByTitleProps) {
  const [searchText, setSearchText] = useState<string>('');
  const [debouncedSearchText] = useDebounce(searchText, 500);

  useEffect(() => {
    const trimmed = debouncedSearchText.trim();
    const keywordToSubmit = trimmed.length >= 3 ? trimmed : '';
    onChange(keywordToSubmit);
  }, [debouncedSearchText, onChange]);

  return (
    <TextField
      fullWidth
      value={searchText}
      onChange={(event) => setSearchText(event.target.value)}
      label="Search (by title)"
      placeholder="Min. 3 characters"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {isLoading && <CircularProgress color="inherit" size={20} />}
            {!isLoading && searchText && (
              <IconButton
                size="small"
                aria-label="clear search input"
                onClick={() => setSearchText('')}
                edge="end"
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            )}
          </InputAdornment>
        ),
      }}
    />
  );
}
