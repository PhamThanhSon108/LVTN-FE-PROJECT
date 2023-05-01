import * as React from 'react';

import Dialog from '@mui/material/Dialog';

import Slide from '@mui/material/Slide';
import { useDispatch } from 'react-redux';
import AddBanner from '../AddBanner/AddBanner';
import { Button } from '@mui/material';
import { inputPropsConstants } from '../../../../constants/variants';
import AddIcon from '@mui/icons-material/Add';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ModalAddBanner(props) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ width: '250px !important' }}>
      <div variant="outlined">
        <div style={{ padding: '15px 0' }} className="col-12 d-flex justify-content-end">
          <Button variant={inputPropsConstants.variantContained} startIcon={<AddIcon />} onClick={handleClickOpen}>
            Thêm Banner
          </Button>
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
        <AddBanner setOpen={(e) => setOpen(e)} />
      </Dialog>
    </div>
  );
}

export default React.memo(ModalAddBanner);
