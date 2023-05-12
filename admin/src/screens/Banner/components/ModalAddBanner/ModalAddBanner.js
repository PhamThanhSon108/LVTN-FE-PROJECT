import * as React from 'react';

import Dialog from '@mui/material/Dialog';

import Slide from '@mui/material/Slide';
import AddBanner from '../AddBanner/AddBanner';
import { IconButton } from '@mui/material';
import { inputPropsConstants } from '../../../../constants/variants';
import AddIcon from '@mui/icons-material/Add';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ModalAddBanner(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  if (!open)
    return (
      <div style={{ width: '250px !important' }}>
        <div variant="outlined">
          <div style={{ padding: '15px 0' }} className="col-12 d-flex justify-content-end">
            <IconButton variant={inputPropsConstants.variantContained} onClick={handleClickOpen}>
              <AddIcon />
            </IconButton>
          </div>
        </div>{' '}
      </div>
    );

  return (
    <div style={{ width: '250px !important' }}>
      <div variant="outlined">
        <div style={{ padding: '15px 0' }} className="col-12 d-flex justify-content-end">
          <IconButton variant={inputPropsConstants.variantContained} onClick={handleClickOpen}>
            <AddIcon />
          </IconButton>
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
