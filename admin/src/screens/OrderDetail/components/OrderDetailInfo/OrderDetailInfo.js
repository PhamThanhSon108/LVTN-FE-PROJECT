import { Box, Card, Divider, Step, StepContent, StepLabel, Stepper, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import { stepShipping } from '../../../../constants/ordersConstants';
import moment from 'moment';

const OrderDetailInfo = (props) => {
  const { order } = props;
  return (
    <div className="row mb-5 order-info-wrap">
      <Card sx={{ boxShadow: 'none' }} className="p-3 mt-2">
        <Box className="d-flex justify-content-between flex-column ">
          <Typography variant="h6" sx={{ mb: 1 }}>
            Địa chỉ nhận hàng
          </Typography>
        </Box>
        <Box className="d-flex col-12">
          <Box className="d-flex flex-column col-6">
            <Typography variant="body1" sx={{ mb: 1 }}>
              {order?.delivery?.to_name}
            </Typography>
            <Typography variant="caption">{order?.delivery?.to_phone}</Typography>

            <Typography variant="caption">
              {`${order?.delivery?.to_address}, ${order?.delivery?.to_ward_name}, ${order?.delivery?.to_district_name}, ${order?.delivery?.to_province_name}`}
            </Typography>
          </Box>

          <Box>
            <Stepper orientation="vertical">
              {order?.statusHistory.reverse().map((step, index) => (
                <Step key={step?._id}>
                  <StepLabel
                    sx={{ svg: { color: 'green' } }}
                    StepIconComponent={() => stepShipping?.[step?.status]?.icon || <Fragment />}
                  >
                    {stepShipping?.[step?.status]?.labelActive}
                  </StepLabel>
                  <StepContent>
                    <Typography variant="caption">
                      Vào {moment(step?.createdAt).format('HH:mm:ss DD/MM/YYYY')}
                    </Typography>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Box>

        {/* 2 */}
      </Card>
    </div>
  );
};

export default OrderDetailInfo;
