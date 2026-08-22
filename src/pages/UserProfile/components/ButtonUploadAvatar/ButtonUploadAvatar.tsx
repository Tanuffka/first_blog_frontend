import { type ChangeEvent, type SyntheticEvent, useRef, useState } from 'react';
import {
  type Crop,
  type PercentCrop,
  type PixelCrop,
  ReactCrop,
} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { useUploadAvatar } from 'src/hooks/useUploadAvatar';
import { centerAspectCrop, getCroppedImage } from 'src/utils/helpers/image';

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

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

export default function ButtonUploadAvatar() {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string>();
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

  const {
    uploadAvatar,
    isPending: isUploading,
    errorMessages,
  } = useUploadAvatar();

  const handleInputReset = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.type = 'text';
      fileInputRef.current.type = 'file';
    }
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setCrop(undefined);
    setSelectedFile(file);

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setImageSrc(reader.result?.toString() || '');
    });
    reader.readAsDataURL(file);
  };

  const handleImageLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    const { width, height, naturalWidth, naturalHeight } = event.currentTarget;

    if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
      // setError('Image must be at least 640 x 640 pixels.');
      setImageSrc(undefined);
      return;
    }

    setCrop(centerAspectCrop(width, height, ASPECT_RATIO));
  };

  const handleCropChange = (_crop: Crop, percentCrop: PercentCrop) => {
    setCrop(percentCrop);
  };

  const handleUploadImage = () => {
    if (!imageRef.current || !completedCrop) return;

    getCroppedImage(imageRef.current, completedCrop).then((file) => {
      uploadAvatar({ file }).then(() => {
        handleCloseDialog();
      });
    });
  };

  const handleCloseDialog = () => {
    setSelectedFile(null);
    handleInputReset();
  };

  return (
    <>
      <Button
        tabIndex={-1}
        role={undefined}
        component="label"
        variant="contained"
      >
        Upload
        <VisuallyHiddenInput
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple={false}
          onChange={handleFileSelect}
        />
      </Button>
      <Dialog open={!!selectedFile}>
        <DialogContent sx={{ display: 'flex' }}>
          <ReactCrop
            circularCrop
            keepSelection
            crop={crop}
            aspect={ASPECT_RATIO}
            minWidth={MIN_DIMENSION}
            onChange={handleCropChange}
            onComplete={(c) => setCompletedCrop(c)}
          >
            <img ref={imageRef} src={imageSrc} onLoad={handleImageLoad} />
          </ReactCrop>
          {errorMessages?.map((message, index) => (
            <Typography key={index} color="red" component="p" fontWeight={600}>
              {message}
            </Typography>
          ))}
        </DialogContent>
        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mx: 2,
            mb: 2,
          }}
        >
          <Button
            color="error"
            variant="outlined"
            sx={{ minWidth: 150 }}
            onClick={handleCloseDialog}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            loading={isUploading}
            sx={{ minWidth: 150 }}
            onClick={handleUploadImage}
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
