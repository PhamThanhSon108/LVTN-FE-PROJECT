import { memo } from 'react';
import ConfirmModal from './ConfirmModal';

function WrapConfirmModal({ children, ...data }) {
    return (
        <>
            <ConfirmModal {...data} />
            <div className="d-flex justify-content-end">{children}</div>
        </>
    );
}

export default memo(WrapConfirmModal);
