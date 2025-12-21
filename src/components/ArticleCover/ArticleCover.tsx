import Box from '@mui/material/Box';
import type { ArticleCoverType } from 'src/shared/types/article';
import Cropper from 'react-easy-crop';
import { useState, type ChangeEvent } from 'react';
import ButtonEditCover from './components/ButtonEditCover';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { StyledSlider } from './components/styledSlider';

export interface ArticleCoverProps {
  cover: ArticleCoverType;
  onChange: (cover: ArticleCoverType) => void;
}

export default function ArticleCover({ cover, onChange }: ArticleCoverProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const handleImageSelect = (value: string) => {
    setImageSrc(value);
  };

  const handleImageZoom = (value: number) => {
    const parsedValue = Math.round(value * 100) / 100;
    setZoom(parsedValue);

    console.log(parsedValue);
  };

  const handleImageDelete = () => {
    setImageSrc(null);
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
        {!imageSrc && <ButtonEditCover onImageSelect={handleImageSelect} />}
        {imageSrc && (
          <Button
            variant="outlined"
            color="error"
            sx={{
              minWidth: 50,
              width: 50,
              height: 50,
              padding: 0,
            }}
            onClick={handleImageDelete}
          >
            <DeleteIcon color="error" />
          </Button>
        )}
      </Grid>
      <Box
        sx={{
          position: 'relative',
          height: 400,
          backgroundImage: 'url(/images/image-placeholder.png)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        {imageSrc && (
          <Cropper
            zoomWithScroll
            objectFit="cover"
            image={imageSrc}
            crop={crop}
            cropSize={{ width: 852, height: 400 }}
            onCropChange={setCrop}
            onZoomChange={handleImageZoom}
            aspect={852 / 400}
            zoom={zoom}
          />
        )}
        {imageSrc && (
          <Box sx={{ position: 'absolute', width: 200, bottom: 30, right: 40 }}>
            <StyledSlider
              aria-labelledby="Zoom"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(_event, value) => handleImageZoom(value)}
            />
          </Box>
        )}
      </Box>
    </Grid>
  );
}
