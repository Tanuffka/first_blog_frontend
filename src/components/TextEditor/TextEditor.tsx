import { useEffect } from 'react';

import { EditorContent, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';

import Paper from '@mui/material/Paper';

import Toolbar from './components/Toolbar';
import './styles.css';

export interface TextEditorProps {
  content: string;
  editable?: boolean;
  isPlainText?: boolean;
  onChange?: (value: string) => void;
}

export default function TextEditor({
  editable = true,
  isPlainText = false,
  content,
  onChange,
}: TextEditorProps) {
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
    ],

    editorProps: {
      attributes: {
        class: `editor ${editable ? 'editable' : ''}`,
      },
    },

    onUpdate({ editor }) {
      onChange?.(editor.getHTML());
    },
  });

  useEffect(() => {
    editor.commands.setContent(content);
  }, [content, editor]);

  if (isPlainText) {
    return editor.getText();
  }

  return (
    <Paper
      elevation={0}
      sx={(theme) => {
        if (!editable) return {};
        return {
          padding: '8px',
          marginBottom: '8px',
          border: `1px solid ${theme.palette.divider}`,
        };
      }}
    >
      {editable && <Toolbar editor={editor} />}
      <EditorContent editor={editor} />
    </Paper>
  );
}
