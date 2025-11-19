import { Editor } from '@tiptap/react';
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  Underline,
  Undo,
} from 'lucide-react';

import { styled } from '@mui/material/styles';
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from '@mui/material/ToggleButtonGroup';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import Paper from '@mui/material/Paper';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    margin: theme.spacing(0.5),
    border: 0,
    borderRadius: theme.shape.borderRadius,
    [`&.${toggleButtonGroupClasses.disabled}`]: {
      border: 0,
    },
  },
  [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]:
    {
      marginLeft: -1,
      borderLeft: '1px solid transparent',
    },
}));

type Props = { editor: Editor | null };

export default function Toolbar({ editor }: Props) {
  if (!editor) return null;

  return (
    <Paper
      elevation={0}
      sx={(theme) => ({
        display: 'flex',
        border: `1px solid ${theme.palette.divider}`,
        flexWrap: 'wrap',
        marginBottom: '8px',
        backgroundColor: 'rgba(0,0,0, 0.02)',
        justifyContent: 'space-between',
      })}
    >
      <StyledToggleButtonGroup exclusive size="small">
        <ToggleButton
          value="heading1"
          selected={editor.isActive('heading', { level: 1 })}
          onChange={() => {
            editor.chain().focus().toggleHeading({ level: 1 }).run();
          }}
        >
          <Heading1 size={20} strokeWidth={2} />
        </ToggleButton>
        <ToggleButton
          value="heading2"
          selected={editor.isActive('heading', { level: 2 })}
          onChange={() => {
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
        >
          <Heading2 size={20} strokeWidth={2} />
        </ToggleButton>
        <ToggleButton
          value="heading3"
          selected={editor.isActive('heading', { level: 3 })}
          onChange={() => {
            editor.chain().focus().toggleHeading({ level: 3 }).run();
          }}
        >
          <Heading3 size={20} strokeWidth={2} />
        </ToggleButton>
        <ToggleButton
          value="heading4"
          selected={editor.isActive('heading', { level: 4 })}
          onChange={() => {
            editor.chain().focus().toggleHeading({ level: 4 }).run();
          }}
        >
          <Heading4 size={20} strokeWidth={2} />
        </ToggleButton>
        <ToggleButton
          value="heading5"
          selected={editor.isActive('heading', { level: 5 })}
          onChange={() => {
            editor.chain().focus().toggleHeading({ level: 5 }).run();
          }}
        >
          <Heading5 size={20} strokeWidth={2} />
        </ToggleButton>
        <ToggleButton
          value="heading6"
          selected={editor.isActive('heading', { level: 6 })}
          onChange={() => {
            editor.chain().focus().toggleHeading({ level: 6 }).run();
          }}
        >
          <Heading6 size={20} strokeWidth={2} />
        </ToggleButton>
      </StyledToggleButtonGroup>
      <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
      <StyledToggleButtonGroup size="small" aria-label="text formatting">
        <ToggleButton
          value="bold"
          selected={editor.isActive('bold')}
          onChange={() => {
            editor.chain().focus().toggleBold().run();
          }}
        >
          <Bold size={20} strokeWidth={2} />
        </ToggleButton>
        <ToggleButton
          value="italic"
          selected={editor.isActive('italic')}
          onChange={() => {
            editor.chain().focus().toggleItalic().run();
          }}
        >
          <Italic size={20} strokeWidth={2} />
        </ToggleButton>
        <ToggleButton
          value="underline"
          selected={editor.isActive('underline')}
          onChange={() => {
            editor.chain().focus().toggleUnderline().run();
          }}
        >
          <Underline size={20} strokeWidth={2} />
        </ToggleButton>
        <ToggleButton
          value="strikeThrough"
          selected={editor.isActive('strikeThrough')}
          onChange={() => {
            editor.chain().focus().toggleStrike().run();
          }}
        >
          <Strikethrough size={20} strokeWidth={2} />
        </ToggleButton>
        <ToggleButton
          value="code"
          selected={editor.isActive('code')}
          onChange={() => {
            editor.chain().focus().toggleCode().run();
          }}
        >
          <Code />
        </ToggleButton>
        <ToggleButton
          value="blockquote"
          selected={editor.isActive('blockquote')}
          onChange={() => {
            editor.chain().focus().toggleBlockquote().run();
          }}
        >
          <Quote size={20} strokeWidth={2} />
        </ToggleButton>
        <ToggleButton
          value="list"
          selected={editor.isActive('list')}
          onChange={() => {
            editor.chain().focus().toggleList('bulletList', 'listItem').run();
          }}
        >
          <List />
        </ToggleButton>
        <ToggleButton
          value="orderedList"
          selected={editor.isActive('orderedList')}
          onChange={() => {
            editor.chain().focus().toggleOrderedList().run();
          }}
        >
          <ListOrdered />
        </ToggleButton>
      </StyledToggleButtonGroup>
      <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
      <StyledToggleButtonGroup exclusive size="small">
        <ToggleButton
          value="undo"
          selected={editor.isActive('undo')}
          onChange={() => {
            editor.chain().focus().undo().run();
          }}
        >
          <Undo size={20} strokeWidth={2} />
        </ToggleButton>
        <ToggleButton
          value="redo"
          selected={editor.isActive('redo')}
          onChange={() => {
            editor.chain().focus().redo().run();
          }}
        >
          <Redo size={20} strokeWidth={2} />
        </ToggleButton>
      </StyledToggleButtonGroup>
    </Paper>
  );
}
