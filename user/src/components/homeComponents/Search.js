import React, { useState, useEffect, useRef } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import useDebounce from '~/hooks/useDebounce';
import request from '~/utils/request';
import { useHistory } from 'react-router-dom';
import useSearchParamsCustom from '~/hooks/useSearchParamCustom';
import { CircularProgress, Typography } from '@mui/material';

const handleSaveOldKey = (keyword) => {
    if (keyword) {
        const oldKeysSearch = JSON.parse(localStorage?.getItem('search'));
        if (!(oldKeysSearch?.length >= 1)) {
            localStorage.setItem('search', JSON.stringify([keyword]));
        } else {
            if (!oldKeysSearch?.find((oldKey) => oldKey === keyword)) {
                localStorage.setItem('search', JSON.stringify([keyword].concat(oldKeysSearch)));
            } else {
                const newSearch = oldKeysSearch?.reduce(
                    (list, key) => {
                        if (key !== keyword) {
                            return [...list, key];
                        }
                        return list;
                    },
                    [keyword],
                );
                localStorage.setItem('search', JSON.stringify(newSearch));
            }
        }
    }
};

const Search = ({ value, keyword, width }) => {
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const history = useHistory();
    const inputRef = useRef();
    const { getParamValue } = useSearchParamsCustom();
    const debounce = useDebounce(value?.searchValue, 500);
    const [loading, setLoading] = useState(false);
    const submitHandler = (e) => {
        e.preventDefault();
        if (!value?.searchValue) {
            history.push(`/`);
        }
        // keyword?.setKeyword(value?.searchValue);
        handleSaveOldKey(value?.searchValue);
        history.push(`/search?keyword=${value?.searchValue}`);
        setShowResult(false);
    };

    const handleClear = () => {
        value.setSearchValue('');
        inputRef.current.reset();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };
    useEffect(() => {
        if (!debounce?.trim()) {
            setSearchResult([]);
            return;
        }
        const fetchApi = async () => {
            try {
                setLoading(true);
                const res = await request.get('/products/search', {
                    params: {
                        keyword: debounce,
                    },
                });
                setSearchResult(res.data?.data?.keywords);
            } catch (error) {
            } finally {
                setLoading(false);
            }
        };
        fetchApi();
    }, [debounce]);
    return (
        <HeadlessTippy
            interactive
            // visible="true"
            visible={showResult}
            render={(attrs) => (
                <div
                    className="shadow-sm"
                    style={{
                        position: 'absolute',
                        right: '50%',
                        transform: 'translateX(calc(44%))',
                        width: width || '460px',
                        top: '56px',
                        borderRadius: '5px',
                        zIndex: '15',
                        backgroundColor: 'white',
                    }}
                >
                    {loading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0' }}>
                            <CircularProgress size={25} />
                        </div>
                    ) : null}
                    {searchResult?.length < 1 && !debounce && !loading
                        ? JSON.parse(localStorage.getItem('search'))
                              ?.slice(0, 7)
                              ?.map((item) => (
                                  <div
                                      className="search-item"
                                      // to={`/search/${item.name}`}
                                      onClick={() => {
                                          value.setSearchValue(item);
                                          keyword?.setKeyword(item);
                                          history.push(`/search?keyword=${item}`);
                                          handleSaveOldKey(item);
                                          setShowResult(false);
                                      }}
                                      style={{
                                          cursor: 'pointer',
                                          padding: '8px 16px',
                                          display: 'flex',
                                          alignItems: 'center',
                                      }}
                                  >
                                      <Typography sx={{ pt: 0 }} noWrap>
                                          {item}
                                      </Typography>
                                  </div>
                              ))
                        : null}
                    {searchResult?.length < 1 && debounce && !loading ? (
                        <Typography sx={{ height: '50px', p: '16px' }}>Không tìm thấy sản phẩm nào</Typography>
                    ) : null}
                    {searchResult?.slice(0, 9)?.map((item) => (
                        <div
                            className="search-item"
                            // to={`/search/${item.name}`}
                            onClick={() => {
                                value.setSearchValue(item.name);
                                keyword?.setKeyword(item.name);
                                history.push(`/search?keyword=${item.name}`);
                                handleSaveOldKey(item?.name);
                                setShowResult(false);
                            }}
                            style={{ cursor: 'pointer', padding: '8px 16px', display: 'flex', alignItems: 'center' }}
                        >
                            <Typography noWrap>{item.name}</Typography>
                        </div>
                    ))}
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <form className="input-group">
                <div style={{ height: '100%', width: '100%', position: 'relative' }}>
                    <div className={'search-wrap d-flex'}>
                        <input
                            // ref={refSearch}
                            type="search"
                            className="form-control rounded search search-focus"
                            placeholder="Nhập từ khóa"
                            value={value.searchValue}
                            defaultValue={getParamValue('keyword')}
                            onChange={(e) => {
                                value.setSearchValue(e.target.value);
                            }}
                            onFocus={() => {
                                setShowResult(true);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    inputRef.current.focus({ focusVisible: true });
                                }
                            }}
                        />
                        <button
                            ref={inputRef}
                            type="submit"
                            onClick={submitHandler}
                            className="search-button search-btn-header"
                        >
                            <i className="fas fa-search submit-search"></i>
                        </button>
                    </div>
                </div>
            </form>
        </HeadlessTippy>
    );
};

export default React.memo(Search);
