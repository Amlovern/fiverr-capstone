import './CategoryPage.css';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import * as gigActions from '../../store/gig';

export default function CategoryPage() {
    const params = useParams();
    const dispatch = useDispatch();
    
    const categoryState = useSelector((state) => state.category.categoriesByCategoryId);
    const gigsState = useSelector((state) => state.gig.gigsByCategoryId);

    const [gigs, setGigs] = useState([]);

    const categoryName = params.categoryName;

    useEffect(() => {
        dispatch(gigActions.getAllGigsThunk())
    }, [dispatch]);

    useEffect(() => {
        let gigsArr = [];
        if (gigsState) {
            Object.keys(gigsState).forEach((key) => {
                gigsArr.push(gigsState[key]);
            });
            setGigs(gigsArr);
        };
    }, [gigsState]);

    if (!gigsState) {
        return null;
    };

    return (
        <div>This is the category page for {categoryName}!</div>
    )
}