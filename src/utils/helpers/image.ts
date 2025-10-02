import { centerCrop, makeAspectCrop, type PixelCrop } from 'react-image-crop';

const IMAGE_EXT = 'webp';
const IMAGE_TYPE = `image/${IMAGE_EXT}`;

export function centerAspectCrop(
  width: number,
  height: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop({ unit: '%', width: 100 }, aspect, width, height),
    width,
    height
  );
}

export async function getCroppedImage(
  image: HTMLImageElement,
  crop: PixelCrop
): Promise<File> {
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  const canvas = new OffscreenCanvas(crop.width, crop.height);
  const ctx = canvas.getContext('2d')!;

  const pixelRatio = window.devicePixelRatio;
  canvas.width = crop.width * pixelRatio;
  canvas.height = crop.height * pixelRatio;
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.imageSmoothingQuality = 'high';

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );

  const blob = await canvas.convertToBlob({ type: IMAGE_TYPE, quality: 1 });

  return new File([blob], `image.${IMAGE_EXT}`, {
    type: IMAGE_TYPE,
  });
}
