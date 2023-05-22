import React, { useState, useEffect, useRef } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import useDebounce from '~/hooks/useDebounce';
import request from '~/utils/request';
import { useHistory } from 'react-router-dom';
import useSearchParamsCustom from '~/hooks/useSearchParamCustom';

const Search = ({ value, keyword, width }) => {
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const history = useHistory();
    const inputRef = useRef();
    const { getParamValue } = useSearchParamsCustom();
    const debounce = useDebounce(value?.searchValue, 500);
    const submitHandler = (e) => {
        e.preventDefault();
        if (!value?.searchValue) {
            history.push(`/`);
        }
        // keyword?.setKeyword(value?.searchValue);
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
                const res = await request.get('/products/search', {
                    params: {
                        keyword: debounce,
                    },
                });
                setSearchResult(res.data?.data?.keywords);
            } catch (error) {}
        };
        fetchApi();
    }, [debounce]);
    return (
        <HeadlessTippy
            interactive
            // visible="true"
            visible={searchResult?.length > 0 && showResult}
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
                    {searchResult?.slice(0, 9)?.map((item) => (
                        <div
                            className="search-item"
                            // to={`/search/${item.name}`}
                            onClick={() => {
                                value.setSearchValue(item.name);
                                keyword?.setKeyword(item.name);
                                history.push(`/search?keyword=${item.name}`);
                                setShowResult(false);
                            }}
                            style={{ cursor: 'pointer', padding: '5px 5px', display: 'flex', alignItems: 'center' }}
                        >
                            <span>{item.name}</span>
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
