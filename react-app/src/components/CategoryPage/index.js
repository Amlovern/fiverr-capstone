import './CategoryPage.css';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import * as gigActions from '../../store/gig';

export default function CategoryPage() {
    const params = useParams();
    const dispatch = useDispatch();
    
    const gigsState = useSelector((state) => state.gig.gigsByCategoryId);

    const [gigs, setGigs] = useState([]);
    console.log(gigs)

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

            if (categoryName === 'Tabletop') {
                setGigs(gigsArr[0]);
            } else if (categoryName === 'Card Game') {
                setGigs(gigsArr[1]);
            } else if (categoryName === 'Video Game') {
                setGigs(gigsArr[2]);
            } else {
                setGigs(gigsArr[3]);
            };
        };
    }, [gigsState, categoryName]);

    if (!gigsState) {
        return null;
    };

    return (
        <div className='category-main-container'>
            <h2 className='category-header'>{categoryName}</h2>
            <div className='search-results-grid'>
                {gigs?.map((gig, idx) => (
                    <div className='gig-card-layout' key={idx}>
                        <div className='gig-wrapper'>
                            <a href={`/gigs/${gig.id}`} target='_blank' rel='noreferrer' className='media'>
                                <div className='slider'>
                                    <div className='slide-preview'>
                                        <img className='gig-image' src={gig.image} alt='gig' />
                                    </div>
                                </div>
                            </a>
                            <h3>
                                <a href={`/gigs/${gig.id}`} target='_blank' rel='noreferrer'>{gig.title}</a>
                            </h3>
                            <footer className='search-result-footer'>
                                <a href={`/gigs/${gig.id}`} target='_blank' rel='noreferrer' className='search-result-price'>
                                    <small>
                                        Starting at
                                    </small>
                                    <span>
                                        ${gig.price}
                                    </span>
                                </a>
                            </footer>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}