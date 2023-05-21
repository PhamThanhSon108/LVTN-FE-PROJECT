import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';

import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Divider,
    Tooltip,
    Typography,
    cardContentClasses,
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { ListCategory } from '~/Redux/Actions/categoryActions';
import styles from './CategorySlider.module.scss';
import styled from '@emotion/styled';
const StyledCardContent = styled(CardContent)(({ theme }) => ({
    '&:last-child': {
        padding: '0px 2px 4px',
    },
}));

const MainSection = ({ children }) => {
    return (
        <Card className={styles.container}>
            <CardHeader
                title={
                    <Typography noWrap variant="button" color="primary">
                        DANH MỤC
                    </Typography>
                }
            />
            <Divider />
            <StyledCardContent sx={{ padding: 0, pb: '0px' }} className={styles.listCategoryWrapper}>
                {children}
            </StyledCardContent>
        </Card>
    );
};

export default function CategorySlider() {
    const dispatch = useDispatch();
    const lcategories = useSelector((state) => state.CategoryList);
    const { loading, categories } = lcategories;
    useEffect(() => {
        dispatch(ListCategory());
    }, [dispatch]);
    if (loading)
        return (
            <MainSection>
                <div className="col-12 d-flex justify-content-center align-items-center" style={{ height: '128.8px' }}>
                    <CircularProgress />
                </div>
            </MainSection>
        );
    return (
        <MainSection>
            {categories?.map((category, index) => {
                return (
                    <Link key={category._id} to={`search?category=${category?.slug}`} className={styles.categoryLink}>
                        <Tooltip title={category?.name}>
                            <Card
                                sx={{
                                    borderRadius: '0',
                                    boxShadow: 'none',

                                    border: '1px solid var(--border-color)',
                                }}
                                className={styles.categoryCard}
                            >
                                <Avatar
                                    sx={{ width: 56, height: 56 }}
                                    sizes="large"
                                    src={category?.image}
                                    alt={category?.name}
                                />

                                <div className={styles.categoryCardContent}>
                                    <Typography noWrap variant="body2" color="text.secondary">
                                        {category?.name}
                                    </Typography>
                                </div>
                            </Card>
                        </Tooltip>
                    </Link>
                );
            })}
        </MainSection>
    );
}
