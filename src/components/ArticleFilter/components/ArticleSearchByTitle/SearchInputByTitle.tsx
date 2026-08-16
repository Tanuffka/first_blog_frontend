import { useState, useEffect } from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@mui/material';
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
  const [search, setSearch] = useState<string>('');
  const [debouncedSearch] = useDebounce(search, 500);
  const isDebouncing = search !== debouncedSearch;
  const showLoader = (isDebouncing && search.trim().length >= 3) || isLoading;

  useEffect(() => {
    const trimmed = debouncedSearch.trim();
    const keywordToSubmit = trimmed.length >= 3 ? trimmed : '';
    onChange(keywordToSubmit);
  }, [debouncedSearch, onChange]);

  return (
    <TextField
      fullWidth
      value={search}
      onChange={(event) => setSearch(event.target.value)}
      label="Search (by title)"
      placeholder="Min. 3 characters"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {showLoader ? (
              <CircularProgress color="inherit" size={20} />
            ) : search ? (
              <IconButton
                size="small"
                aria-label="clear search input"
                onClick={() => setSearch('')}
                edge="end"
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            ) : null}
          </InputAdornment>
        ),
      }}
    />
  );
}
