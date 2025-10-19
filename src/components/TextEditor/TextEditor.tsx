import { useEffect, useState } from 'react';

import { EditorContent, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { CharacterCount, Placeholder } from '@tiptap/extensions';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { type Theme } from '@mui/material';

import Toolbar from './components/Toolbar';
import './styles.css';

export interface TextEditorProps {
  content: string;
  editable?: boolean;
  isPlainText?: boolean;
  error?: string;
  placeholder?: string;
  onChange?: (value: [string, number]) => void;
}

export default function TextEditor({
  content,
  editable = true,
  isPlainText = false,
  error,
  placeholder,
  onChange,
}: TextEditorProps) {
  const [isFocused, setIsFocused] = useState(false);

  const editor = useEditor({
    editable,
    content,

    extensions: [
      StarterKit.configure({
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
        blockquote: {
          HTMLAttributes: {
            class: 'blockquote',
          },
        },
      }),
      CharacterCount.configure({}),
      Placeholder.configure({ placeholder, showOnlyWhenEditable: true }),
    ],

    editorProps: {
      attributes: {
        class: `editor ${editable ? 'editable' : ''}`,
      },
    },

    onCreate({ editor }) {
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

    onFocus() {
      setIsFocused(true);
    },

    onBlur() {
      setIsFocused(false);
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

    const borderColor = !!error
      ? `${theme.palette.error.main} !important`
      : borderColorPrimary;

    const outlineColor = isFocused ? borderColor : 'transparent';

    return {
      padding: 1,
      outlineWidth: 1,
      borderWidth: 1,
      outlineStyle: 'solid',
      borderStyle: 'solid',
      outlineColor,
      borderColor,
      outlineOffset: -2,

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
          variant="caption"
          color="error"
          sx={{ display: 'block', mx: '14px', mt: '3px', mb: 0 }}
        >
          {error}
        </Typography>
      )}
    </Box>
  );
}
