import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useDispatch } from 'react-redux';
import { updateSlider } from '../../../../Redux/Actions/SliderAction';
import { IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default React.memo(function ModalUpdateBanner(props) {
  const { id } = props;
  const [open, setOpen] = React.useState(false);
  const [newImage, setNewImage] = React.useState('');
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleSubmit = () => {
    const slider = new FormData();
    slider.append('slider', newImage);
    dispatch(updateSlider({ id, slider }));
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ width: '250px !important' }}>
      <IconButton onClick={handleClickOpen}>
        <Tooltip title="Chỉnh sửa">
          <EditIcon />
        </Tooltip>
      </IconButton>
      <Dialog
        style={{ minWidth: '250px !important' }}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Cập nhật banner'}</DialogTitle>
        <img alt="" src={newImage && URL.createObjectURL(newImage)} style={{ maxHeight: '280px', width: '280px' }} />
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">Update this banner?</DialogContentText>
          <input type="file" name="slider" accept="image/*" onChange={(e) => setNewImage(e.target.files[0])} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});
