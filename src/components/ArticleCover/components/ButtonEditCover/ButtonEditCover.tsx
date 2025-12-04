import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { type ChangeEvent } from 'react';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export interface ButtonEditCoverProps {
  onImageSelect: (imageSrc: string) => void;
}

export default function ButtonEditCover({
  onImageSelect,
}: ButtonEditCoverProps) {
  const handleImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      onImageSelect(reader.result?.toString() || '');
    });
    reader.readAsDataURL(file);
  };

  return (
    <Button
      component="label"
      variant="outlined"
      role={undefined}
      tabIndex={-1}
      startIcon={<EditIcon />}
    >
      Edit cover
      <VisuallyHiddenInput
        multiple={false}
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
      />
    </Button>
  );
}
