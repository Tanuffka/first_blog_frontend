import { useState } from 'react';
import Cropper, { type Area, type Point } from 'react-easy-crop';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

import { getPublicFileURL } from 'src/utils/helpers/s3.ts';

import ButtonEditCover from './components/ButtonEditCover';
import { StyledSlider } from './components/styledSlider';

export interface ArticleCoverProps {
  coverWidth: number;
  coverHeight: number;
  coverImage?: string;
  onFileSelect: (file: File | null) => void;
  onCropComplete: (croppedAreaPixels: Area) => void;
}

export default function ArticleCover({
  coverWidth,
  coverHeight,
  coverImage,
  onFileSelect,
  onCropComplete,
}: ArticleCoverProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [cropPoint, setCropPoint] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const handleFileSelect = (file: File | null) => {
    onFileSelect(file);

    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setImageSrc(reader.result?.toString() || '');
    });
    reader.readAsDataURL(file);
  };

  const handleCropChange = ({ x, y }: Point) => {
    setCropPoint({ x, y });
  };

  const handleCropComplete = (_croppedArea: Area, croppedAreaPixels: Area) => {
    onCropComplete(croppedAreaPixels);
  };

  const handleZoomChange = (value: number) => {
    const parsedValue = Math.round(value * 100) / 100;
    setZoom(parsedValue);
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
        {!imageSrc && <ButtonEditCover onFileSelect={handleFileSelect} />}
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
          height: coverHeight,
          position: 'relative',
          backgroundImage: 'url(/images/image-placeholder.png)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        {coverImage && (
          <Box
            component="img"
            src={getPublicFileURL(coverImage) as string}
            alt="article cover"
            sx={{ width: '100%', height: '100%' }}
          />
        )}
        {imageSrc && (
          <Cropper
            zoomWithScroll
            objectFit="cover"
            image={imageSrc}
            crop={cropPoint}
            cropSize={{ width: coverWidth, height: coverHeight }}
            aspect={coverWidth / coverHeight}
            zoom={zoom}
            onCropChange={handleCropChange}
            onCropComplete={handleCropComplete}
            onZoomChange={handleZoomChange}
          />
        )}
        {imageSrc && (
          <Box sx={{ position: 'absolute', width: 200, bottom: 30, right: 40 }}>
            <StyledSlider
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(_event, value) => handleZoomChange(value as number)}
            />
          </Box>
        )}
      </Box>
    </Grid>
  );
}
