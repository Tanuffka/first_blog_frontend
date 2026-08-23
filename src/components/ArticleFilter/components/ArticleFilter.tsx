import { memo, useCallback, useState } from 'react';

import { Box } from '@mui/material';

import type { UseSearchArticleParams } from 'src/hooks/useSearchArticle';
import { SORT_ORDER } from 'src/shared/types/common';

import SearchInputByTitle from './ArticleSearchByTitle';
import TagsInputFilter from './ArticleTagsFilter/TagsInputFilter';

interface ArticleFilterProps {
  onChange: (filters: UseSearchArticleParams) => void;
}

function ArticleFilter({ onChange }: ArticleFilterProps) {
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);

  const handleTitleChange = useCallback(
    (newKeyword: string) => {
      setSearchKeyword(newKeyword);
      onChange({
        order: SORT_ORDER.desc,
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
        order: SORT_ORDER.desc,
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
