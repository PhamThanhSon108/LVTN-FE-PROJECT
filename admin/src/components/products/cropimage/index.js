import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import Cropper from 'react-easy-crop';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ImgDialog from './ImgDialog';
import getCroppedImg from './CropImage';
import { classes } from './styles';

const CropImage = ({ image, setImage }) => {
  const curentImg = image && URL.createObjectURL(image);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  const getUrlExtension = (url) => {
    return url.split(/[#?]/)[0].split('.').pop().trim();
  };
  const onImageEdit = async (imgUrl) => {
    var imgExt = getUrlExtension(imgUrl);

    const response = await fetch(imgUrl);
    const blob = await response.blob();
    const file = new File([blob], 'profileImage.' + imgExt, {
      type: blob.type,
    });
    setImage(file);
  };
  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(curentImg, croppedAreaPixels, rotation);
      // console.log('donee', { croppedImage });
      // setImage(croppedImage);
      // setZoom(0);
      setCroppedImage(croppedImage);
      onImageEdit(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation]);

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  return (
    <div className="d-block">
      <div className={classes.cropContainer} style={{ height: '30px', width: '30px' }}>
        <Cropper
          image={curentImg}
          crop={crop}
          rotation={rotation}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div className={classes.controls}>
        <div className={classes.sliderContainer}>
          <Typography variant="overline" classes={{ root: classes.sliderLabel }}>
            Zoom
          </Typography>
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            classes={{ root: classes.slider }}
            onChange={(e, zoom) => setZoom(zoom)}
          />
        </div>
        <div className={classes.sliderContainer}>
          <Typography variant="overline" classes={{ root: classes.sliderLabel }}>
            Rotation
          </Typography>
          <Slider
            value={rotation}
            min={0}
            max={360}
            step={1}
            aria-labelledby="Rotation"
            classes={{ root: classes.slider }}
            onChange={(e, rotation) => setRotation(rotation)}
          />
        </div>
        <Button onClick={showCroppedImage} variant="contained" color="primary" classes={{ root: classes.cropButton }}>
          Choose image
        </Button>
      </div>
      <ImgDialog img={croppedImage} onClose={onClose} />
    </div>
  );
};
export default CropImage;
