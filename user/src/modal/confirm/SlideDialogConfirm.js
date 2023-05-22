import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function SlideDialogConfirm(props) {
    const { handleConfirm } = props;
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = (e) => {
        e.stopPropagation();
        setOpen(true);
    };
    const handleSubmit = () => {
        // const id = [handleConfirm.key];
        handleConfirm.handleSubmit([handleConfirm.key], handleConfirm.setCartChoise);
        setOpen(false);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div style={{ minWidth: '400px !important' }}>
            <div variant="outlined" onClick={handleClickOpen}>
                Xóa
            </div>
            <Dialog
                style={{ minWidth: '400px !important' }}
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle style={{ width: '350px' }}>{'Bạn có chắc muốn xóa sản phẩm?'}</DialogTitle>
                <DialogContent style={{ width: '350px' }}>
                    <DialogContentText style={{ width: '250px' }} id="alert-dialog-slide-description">
                        Xóa sản phẩm
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button onClick={handleSubmit}>Xóa</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
