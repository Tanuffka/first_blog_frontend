import type { FilterApiResponseSchema } from 'src/hooks/useSearchArticle';
import { memo, useCallback, useState } from 'react';
import { Box } from '@mui/material';
import SearchInputByTitle from './ArticleSearchByTitle';
import TagsInputFilter from './ArticleTagsFilter/TagsInputFilter';

export interface ArticleFilterProps {
  onChange: (filters: FilterApiResponseSchema) => void;
}

function ArticleFilter({ onChange }: ArticleFilterProps) {
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);

  const handleTitleChange = useCallback(
    (newKeyword: string) => {
      setSearchKeyword(newKeyword);
      onChange({
        order: 'DESC',
        searchKeyword: newKeyword,
        searchByTitle: true,
        tags,
      });
    },
    [onChange, tags],
  );

  const handleTagsChange = useCallback(
    (newTags: string[]) => {
      setTags(newTags);
      onChange({
        order: 'DESC',
        searchKeyword,
        searchByTitle: true,
        tags: newTags,
      });
    },
    [searchKeyword, onChange],
  );

  return (
    <Box
      display="flex"
      alignItems="flex-start"
      gap={1}
      my={3}
      sx={{ width: '100%' }}
    >
      <SearchInputByTitle onChange={handleTitleChange} />
      <TagsInputFilter onChange={handleTagsChange} />
    </Box>
  );
}

export default memo(ArticleFilter);
