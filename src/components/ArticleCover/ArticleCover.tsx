import Box from '@mui/material/Box';
import type { ArticleCoverType } from 'src/shared/types/article';
import Cropper, { type Point } from 'react-easy-crop';
import { useEffect, useState } from 'react';
import ButtonEditCover from './components/ButtonEditCover';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { StyledSlider } from './components/styledSlider';

export interface ArticleCoverProps {
  cover: ArticleCoverType;
  onChange: (cover: ArticleCoverType) => void;
  onFileSelect: (file: File | null) => void;
}

export default function ArticleCover({
  cover,
  onChange,
  onFileSelect,
}: ArticleCoverProps) {
  const {
    fileDownloadUrl,
    cropOptions: { zoom, width, height, x, y },
  } = cover;

  const [imageSrc, setImageSrc] = useState<string | null>(null);

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
    console.log({ x, y });

    // onChange({ ...cover, cropOptions: { ...cover.cropOptions, x, y } });
  };

  const handleImageZoom = (value: number) => {
    const parsedValue = Math.round(value * 100) / 100;
    onChange({
      ...cover,
      cropOptions: { ...cover.cropOptions, zoom: parsedValue },
    });
  };

  const handleImageDelete = () => {
    setImageSrc(null);
  };

  useEffect(() => {
    if (fileDownloadUrl) {
      setImageSrc(fileDownloadUrl);
    }
  }, [fileDownloadUrl]);

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
          height,
          position: 'relative',
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
            crop={{ x, y }}
            cropSize={{ width, height }}
            onCropChange={handleCropChange}
            onZoomChange={handleImageZoom}
            aspect={width / height}
            zoom={zoom}
          />
        )}
        {imageSrc && (
          <Box sx={{ position: 'absolute', width: 200, bottom: 30, right: 40 }}>
            <StyledSlider
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(_event, value) => handleImageZoom(value as number)}
            />
          </Box>
        )}
      </Box>
    </Grid>
  );
}
