import { Breadcrumbs } from '@mui/material';
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { privateRouter } from '../../router/router';

export default function BreadcrumbsCustom() {
  const location = useLocation();
  const breadcrumbRouter = location.pathname.split('/').slice(1);
  if (breadcrumbRouter.length <= 1) return null;

  if (breadcrumbRouter[breadcrumbRouter.length - 1] === 'edit') {
    return (
      <Breadcrumbs aria-label="breadcrumb">
        {breadcrumbRouter.slice(0, breadcrumbRouter.length - 1).map((value, index) => {
          if (index === breadcrumbRouter.length - 2) return <span>Chỉnh sửa</span>;
          return (
            <Link
              key={value}
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center' }}
              color="inherit"
              to={`/${breadcrumbRouter.slice(0, index + 1).join('/')}`}
            >
              {
                privateRouter.find((router) => router.path === `/${breadcrumbRouter.slice(0, index + 1).join('/')}`)
                  ?.name
              }
            </Link>
          );
        })}
      </Breadcrumbs>
    );
  }
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {breadcrumbRouter.map((value, index) => {
        if (index === breadcrumbRouter.length - 1)
          return (
            <span>
              {
                privateRouter.find((router) => router.path === `/${breadcrumbRouter.slice(0, index + 1).join('/')}`)
                  ?.name
              }
            </span>
          );
        return (
          <Link
            key={value}
            underline="hover"
            sx={{ display: 'flex', alignItems: 'center' }}
            color="inherit"
            to={`/${breadcrumbRouter.slice(0, index + 1).join('/')}`}
          >
            {privateRouter.find((router) => router.path === `/${breadcrumbRouter.slice(0, index + 1).join('/')}`)?.name}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
