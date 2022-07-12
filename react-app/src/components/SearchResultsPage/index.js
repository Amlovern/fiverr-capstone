import './SearchResultsPage.css';
import ConfusedJahy from '../../images/Confused-Jahy.png'

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import * as gigActions from '../../store/gig';

export default function SearchResultsPage() {
    const dispatch = useDispatch();
    const params = useParams();

    const gigsState = useSelector((state) => state.gig.gigsByGigId);

    const [gigs, setGigs] = useState([]);

    const query = params.query;

    useEffect(() => {
        dispatch(gigActions.searchGigThunk(query))
    }, [dispatch, query])

    useEffect(() => {
        let gigsArr = [];
        if (gigsState) {
            Object.keys(gigsState).forEach((key) => {
                gigsArr.push(gigsState[key]);
            });
            setGigs(gigsArr)
        }
    }, [gigsState])

    if (!gigsState) {
        return null;
    };

    return (
        <div>
            {gigs.length === 0 && (
                <div className='search-error-container'>
                    <div className='search-error-image'>
                        <img src={ConfusedJahy} alt='empty search' />
                    </div>
                    <h2 className='search-error-header'>No Services Found For Your Search</h2>
                    <p className='search-error-text'>Try a new search find what you are looking for.</p>
                </div>
            )}
            <div className='search-main-container'>
                <h2 className='search-header'>
                    <span className='title'>Results for "{query}"</span>
                </h2>
                <div className='number-of-results'>
                    <span>{gigs?.length} services available</span>
                </div>
                {gigs?.map((gig, idx) => (
                    <div className='gig-card-layout' key={idx}>
                        <div className='gig-wrapper'>
                            <a href={`/gigs/${gig.id}`} target="_blank" rel='noreferrer' className='media'>
                                <img src={gig.image} alt='gig' />
                            </a>
                            <div className='seller-info'>
                                <div className='inner-wrapper'>
                                    <div className='seller-identifiers'>
                                        <div className='seller-name'>{}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p>{gig.title}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}