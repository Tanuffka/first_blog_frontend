import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';

import ClearIcon from '@mui/icons-material/Clear';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

interface ArticleSearchByTitleProps {
  isLoading?: boolean;
  onChange: (searchKeyword: string) => void;
}

export default function SearchInputByTitle({
  isLoading = false,
  onChange,
}: ArticleSearchByTitleProps) {
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  useEffect(() => {
    const trimmed = debouncedSearchKeyword.trim();
    const keywordToSubmit = trimmed.length >= 3 ? trimmed : '';
    onChange(keywordToSubmit);
  }, [debouncedSearchKeyword, onChange]);

  return (
    <TextField
      fullWidth
      value={searchKeyword}
      label="Search (by title)"
      placeholder="Min. 3 characters"
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              {isLoading && <CircularProgress size={20} color="inherit" />}
              {!isLoading && searchKeyword && (
                <IconButton
                  edge="end"
                  size="small"
                  aria-label="clear search input"
                  onClick={() => setSearchKeyword('')}
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              )}
            </InputAdornment>
          ),
        },
      }}
      onChange={(event) => setSearchKeyword(event.target.value)}
    />
  );
}
