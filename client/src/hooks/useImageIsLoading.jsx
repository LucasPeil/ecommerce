import { useEffect, useState } from 'react';

const useImageIsLoading = ({ image }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.src = image;

    img.onload = () => {
      setImageLoaded(true);
    };
  }, [image]);
  return imageLoaded;
};

export default useImageIsLoading;
