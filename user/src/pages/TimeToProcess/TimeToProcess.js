import React from 'react';
import { Link } from 'react-router-dom';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import { Box, Button, Typography } from '@mui/material';
const TimeToProcess = () => {
    return (
        <div className="container my-5">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="mb-2 mb-sm-5   d-flex justify-content-center align-items-center flex-column">
                    <Box
                        className="d-flex align-items-center justify-content-center"
                        style={{ height: 100, width: 100, borderRadius: 50, backgroundColor: 'var(--border-color)' }}
                    >
                        <HourglassTopIcon color="warning" sx={{ fontSize: 50 }} />
                    </Box>
                    <Typography className="mt-2">Thanh toán cần một ít phút để xử lý.</Typography>
                    <Typography>Quay lại sau!</Typography>
                    <Button className="col-md-3 col-sm-6 col-12 btn btn-success mt-2" variant="contained">
                        <Link to="/" className="text-white text-decoration-none">
                            Về trang chủ
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TimeToProcess;
