import React from 'react';
import styles from './NotFoundResult.module.scss';
import BlockIcon from '@mui/icons-material/Block';
export default function NotFoundResult({ title = '' }) {
  return (
    <div className={styles.container}>
      <div className={styles.notFoundWrapper}>
        <BlockIcon />
        <span className={styles.text}>{title || 'Không tìm thấy'}</span>
      </div>
    </div>
  );
}
