export const getPublicFileURL = (fileKey?: string) => {
  if (!fileKey || fileKey.length === 0) {
    return null;
  }

  return `${import.meta.env.VITE_PUBLIC_S3_BUCKET_URL}/${fileKey}`;
};
