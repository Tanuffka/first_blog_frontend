import { memo, useCallback, useState } from 'react';

import { Box } from '@mui/material';

import type { FilterApiResponseSchema } from 'src/hooks/useSearchArticle';
import { SortOrder } from 'src/shared/types/order';

import SearchInputByTitle from './ArticleSearchByTitle';
import TagsInputFilter from './ArticleTagsFilter/TagsInputFilter';

interface ArticleFilterProps {
  onChange: (filters: FilterApiResponseSchema) => void;
}

function ArticleFilter({ onChange }: ArticleFilterProps) {
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);

  const handleTitleChange = useCallback(
    (newKeyword: string) => {
      setSearchKeyword(newKeyword);
      onChange({
        order: SortOrder.DESC,
        searchByTitle: true,
        searchKeyword: newKeyword,
        tags,
      });
    },
    [tags, onChange],
  );

  const handleTagsChange = useCallback(
    (newTags: string[]) => {
      setTags(newTags);
      onChange({
        order: SortOrder.DESC,
        searchByTitle: true,
        searchKeyword,
        tags: newTags,
      });
    },
    [searchKeyword, onChange],
  );

  return (
    <Box
      my={3}
      gap={1}
      display="flex"
      sx={{ width: '100%' }}
      alignItems="flex-start"
    >
      <SearchInputByTitle onChange={handleTitleChange} />
      <TagsInputFilter onChange={handleTagsChange} />
    </Box>
  );
}

export default memo(ArticleFilter);
