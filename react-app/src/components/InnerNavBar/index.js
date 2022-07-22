import './InnerNavBar.css';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const InnerNavBar = () => {
    const categories = useSelector((state) => state.category.categoriesByCategoryId);

    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        let categoriesArr = [];
        if (categories) {
            Object.keys(categories).forEach((key) => {
                categoriesArr.push(categories[key]);
            });
            setCategoryList(categoriesArr);
        };
    }, [categories])

    if (!categoryList) {
        return null;
    };

    return (
        <div className='categories-container'>
            <div className='categories-menu'>
                <ul className='categories'>
                    {categoryList?.map((category, idx) => (
                        <li className='menu-item' key={idx}>
                            <a href={`/category/${category.name}`}>{category.name}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
};

export default InnerNavBar;