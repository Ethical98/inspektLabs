import React, { useEffect, useState, useRef } from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.min.css';
import './imageCropper.css';
import { Image } from 'react-bootstrap';

const UploadedScreen = ({ history, location, search }) => {
  const [imageDest, setImageDest] = useState('');
  const url = window.location.href.split('http://localhost:3000')[1];
  console.log(url);

  const imageElement = useRef('');

  useEffect(() => {
    const cropper = new Cropper(imageElement.current, {
      zoomable: true,
      scalable: false,
      aspectRatio: 16 / 9,
      crop: () => {
        const canvas = cropper.getCroppedCanvas();
        setImageDest(canvas.toDataURL('image/png'));
      },
    });
  });
  return (
    <>
      <div>
        <div className='img-container'>
          <Image ref={imageElement} src={url} />
        </div>
        <Image className='img-preview' src={imageDest} alt='Destination' />
      </div>
    </>
  );
};

export default UploadedScreen;
