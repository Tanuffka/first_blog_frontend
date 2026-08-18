import { CharacterCount, Placeholder } from '@tiptap/extensions';
import { EditorContent, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { useEffect, useState } from 'react';

import { type Theme } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import Toolbar from './components/Toolbar';
import './styles.css';

export interface TextEditorProps {
  content: string;
  editable?: boolean;
  error?: string;
  isPlainText?: boolean;
  placeholder?: string;
  onChange?: (value: [string, number]) => void;
}

export default function TextEditor({
  content,
  editable = true,
  error,
  isPlainText = false,
  placeholder,
  onChange,
}: TextEditorProps) {
  const [isFocused, setIsFocused] = useState(false);

  const editor = useEditor({
    content,
    editable,

    editorProps: {
      attributes: {
        class: `editor ${editable ? 'editable' : ''}`,
      },
    },

    extensions: [
      StarterKit.configure({
        blockquote: {
          HTMLAttributes: {
            class: 'blockquote',
          },
        },
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
          HTMLAttributes: {
            class: 'editor-heading',
          },
        },
        paragraph: {
          HTMLAttributes: {
            class: 'editor-paragraph',
          },
        },
      }),
      CharacterCount.configure({}),
      Placeholder.configure({ placeholder, showOnlyWhenEditable: true }),
    ],

    onBlur() {
      setIsFocused(false);
    },

    onFocus() {
      setIsFocused(true);
    },

    onMount({ editor }) {
      onChange?.([
        editor.getHTML(),
        editor.storage.characterCount.characters(),
      ]);
    },

    onUpdate({ editor }) {
      onChange?.([
        editor.getHTML(),
        editor.storage.characterCount.characters(),
      ]);
    },
  });

  useEffect(() => {
    editor.commands.setContent(content);
  }, [content, editor]);

  const getPaperSxStyles = (theme: Theme) => {
    if (!editable) return {};

    const borderColorPrimary = isFocused
      ? `${theme.palette.primary.main} !important`
      : 'rgba(0,0,0, 0.23)';

    const borderColor = error
      ? `${theme.palette.error.main} !important`
      : borderColorPrimary;

    const outlineColor = isFocused ? borderColor : 'transparent';

    return {
      borderColor,
      borderStyle: 'solid',
      borderWidth: 1,
      outlineColor,
      outlineOffset: -2,
      outlineStyle: 'solid',
      outlineWidth: 1,
      padding: 1,

      '&:hover': {
        borderColor: 'rgba(0,0,0, 0.87)',
      },
    };
  };

  if (isPlainText) {
    return editor.getText();
  }

  return (
    <Box mb={1}>
      <Paper elevation={0} sx={getPaperSxStyles}>
        {editable && <Toolbar editor={editor} />}
        <EditorContent editor={editor} />
      </Paper>
      {editable && !!error && (
        <Typography
          color="error"
          variant="caption"
          sx={{ display: 'block', mb: 0, mt: '3px', mx: '14px' }}
        >
          {error}
        </Typography>
      )}
    </Box>
  );
}
