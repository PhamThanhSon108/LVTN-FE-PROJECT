import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
export const statusDescription = {
  placed: 'Đơn hàng mới',
  approved: 'Đơn hàng đã được duyệt',
  delivering: 'Đơn hàng đang giao',
  paid: 'Đã thanh toán',
  completed: 'Đơn hàng hoàn tất',
  cancelled: 'Đơn hàng bị hủy',
};

export const statusFilter = [
  { status: '', description: 'Tất cả đơn' },
  { status: 'placed', description: 'Đơn hàng mới' },
  { status: 'confirm', description: 'Đã xác nhận' },
  { status: 'delivering', description: 'Đang giao hàng' },
  { status: 'paid', description: 'Đã thanh toán' },
  { status: 'completed', description: 'Hoàn tất' },
  { status: 'failed', description: 'Lỗi' },
  { status: 'cancelled', description: 'Đơn hàng bị hủy' },
];

export const statusAdminUpdate = {
  'Update status': 'null',
  Approved: 'Order approved',
  Delivering: 'Orders are being delivered',
  Failed: 'Delivery failed',
  Completed: 'Completed order',
};

export const statusToUpdate = [
  {
    status: 'confirm',
    label: 'Đã xác nhận đơn hàng',
  },
  {
    status: 'delivering',
    label: 'Đang giao',
  },
  {
    status: 'delivered',
    label: 'Đã giao',
  },
  {
    status: 'completed',
    label: 'Hoàn tất đơn hàng',
  },
];

export const dateFilter = [
  { status: 'newest', description: 'Mới nhất' },
  { status: 'latest', description: 'Cũ tới mới' },
];

export const stepShipping = {
  placed: {
    icon: <StickyNote2OutlinedIcon />,
    label: 'Đặt hàng',
    labelActive: 'Đã đặt đơn hàng',
    color: 'info',
  },
  confirm: {
    icon: <CheckOutlinedIcon />,
    label: 'Xác nhận đơn hàng',
    labelActive: 'Đã xác nhận đơn hàng',
  },
  delivering: {
    icon: <LocalShippingOutlinedIcon />,
    label: 'Giao hàng',
    labelActive: 'Đang giao hàng',
  },
  delivered: { icon: <LocalShippingOutlinedIcon />, label: 'Đã giao hàng', labelActive: 'Đã giao hàng' },
  cancelled: { icon: <CancelOutlinedIcon />, label: 'Đơn hàng bị hủy', labelActive: 'Đơn hàng bị hủy', color: 'error' },
  completed: {
    icon: <VerifiedUserOutlinedIcon />,
    label: 'Hoàn tất',
    labelActive: 'Hoàn tất đơn hàng',
    color: 'success',
  },
  paid: { icon: <PaidOutlinedIcon />, label: 'Thanh toán', labelActive: 'Đã thanh toán' },
};
