import Box from '@mui/material/Box';
import type { ArticleCoverType } from 'src/shared/types/article';
import Cropper from 'react-easy-crop';
import { useState } from 'react';
import ButtonEditCover from './components/ButtonEditCover';
import Grid from '@mui/material/Grid';

export interface ArticleCoverProps {
  cover: ArticleCoverType;
  onChange: (cover: ArticleCoverType) => void;
}

export default function ArticleCover({ cover, onChange }: ArticleCoverProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });

  const handleImageSelect = (value: string) => {
    setImageSrc(value);
  };

  return (
    <Grid
      container
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: '100%',
        flexDirection: 'column',
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{ position: 'absolute', zIndex: 1, top: 40, right: 40 }}
      >
        <ButtonEditCover onImageSelect={handleImageSelect} />
      </Grid>
      <Box
        sx={{
          position: 'relative',
          height: 400,
          backgroundImage: 'url(/images/image-placeholder.png)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          img: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            overflow: 'hidden',
          },
        }}
      >
        {imageSrc && (
          <Cropper
            image={imageSrc}
            crop={crop}
            cropSize={{ width: 852, height: 400 }}
            onCropChange={setCrop}
            aspect={852 / 400}
            zoom={1}
          />
        )}
      </Box>
    </Grid>
  );
}
