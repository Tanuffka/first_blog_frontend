import { centerCrop, makeAspectCrop, type PixelCrop } from 'react-image-crop';
import { type Area as CropArea } from 'react-easy-crop';

const IMAGE_EXT = 'webp';
const IMAGE_TYPE = `image/${IMAGE_EXT}`;

const parseImageUrlToBase64 = async (url: string): Promise<string> => {
  const data = await fetch(url);
  const blob = await data.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      resolve(base64data as string);
    };
    reader.onerror = reject;
  });
};

const createImage = (src: File | string): Promise<HTMLImageElement> =>
  new Promise(async (resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.src =
      typeof src === 'string'
        ? await parseImageUrlToBase64(src)
        : URL.createObjectURL(src);
  });

export function centerAspectCrop(
  width: number,
  height: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop({ unit: '%', width: 100 }, aspect, width, height),
    width,
    height,
  );
}

export async function getCroppedImage(
  image: HTMLImageElement,
  crop: PixelCrop,
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
    crop.height,
  );

  const blob = await canvas.convertToBlob({ type: IMAGE_TYPE, quality: 1 });

  return new File([blob], `image.${IMAGE_EXT}`, {
    type: IMAGE_TYPE,
  });
}

export async function getCroppedImageFromFile(
  imageSrc: File | string,
  pixelCrop: CropArea,
) {
  const image = await createImage(imageSrc);

  return getCroppedImage(image, { ...pixelCrop, unit: 'px' });
}
