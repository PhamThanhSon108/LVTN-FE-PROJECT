import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = (props) => {
    const { page, pages, keyword = '', category } = props;
    return (
        pages > 1 && (
            <nav
                className="float-end mt-4"
                aria-label="Page navigation"
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <div className="icon-left">
                    <Link
                        to={`/search${keyword && '?keyword=' + keyword}${category && '?category=' + category}?page=${
                            page > 1 ? page - 1 : page
                        }`}
                    >
                        <i class="fas fa-angle-double-left"></i>
                    </Link>
                </div>
                <ul className="pagination justify-content-center">
                    {[...Array(pages).keys()].map((x) => (
                        <li className={`page-item ${x + 1 === page ? 'active' : ''}`} key={x + 1}>
                            <Link
                                className="page-link"
                                to={`/search${keyword && '?keyword=' + keyword}${
                                    category && '?category=' + category
                                }?page=${x + 1}`}
                            >
                                {x + 1}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="icon-right">
                    <Link
                        to={`/search${keyword && '?keyword=' + keyword}${category && '?category=' + category}?page=${
                            page < pages ? page + 1 : pages
                        }`}
                    >
                        <i class="fas fa-angle-double-right"></i>
                    </Link>
                </div>
            </nav>
        )
    );
};

export default Pagination;
