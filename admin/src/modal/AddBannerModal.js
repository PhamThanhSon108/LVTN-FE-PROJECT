import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useDispatch } from 'react-redux';
import { createSlider, updateSlider } from '../Redux/Actions/SliderAction';
import { Image } from 'primereact/image';
import AddSlider from '../components/Slider/AddSlider';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AddBannerModal(props) {
  // const { id } = props;
  const [open, setOpen] = React.useState(false);
  const [newImage, setNewImage] = React.useState('');
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };
  // const handleSubmit = () => {
  //   // const id = [handleConfirm.key];
  //   const slider = new FormData();
  //   slider.append('slider', newImage);
  //   dispatch(updateSlider({ id, slider }));
  //   setOpen(false);
  // };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ width: '250px !important' }}>
      <div variant="outlined">
        <div style={{ padding: '15px 0' }} className="col-12 d-flex justify-content-end">
          <button class="btn btn-outline-secondary col-5" onClick={handleClickOpen} type="button">
            Add banner
          </button>
        </div>
      </div>
      <Dialog
        style={{ minWidth: '250px !important' }}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        {/* <DialogTitle>{'Are you sure?'}</DialogTitle>
        <img src={newImage && URL.createObjectURL(newImage)} style={{ maxHeight: '280px' }} />
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">Update this banner?</DialogContentText>
          <input type="file" name="slider" onChange={(e) => setNewImage(e.target.files[0])} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions> */}
        <AddSlider setOpen={(e) => setOpen(e)} />
      </Dialog>
    </div>
  );
}

export default React.memo(AddBannerModal);
