import './MyGigsPage.css';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as gigActions from '../../store/gig';

export default function MyGigsPage() {
    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.session.user);
    const allGigs = useSelector((state) => state.gig.gigsByOwnerId);

    const usersGigs = allGigs[sessionUser.id];

    useEffect(() => {
        dispatch(gigActions.getAllGigsThunk())
    }, [dispatch])

    if (!sessionUser) {
        return null;
    };

    return (
        <div>
            {usersGigs.length > 0 && (
                <div>
                    <div className='my-gigs-header-container'>
                        <h2 className='my-gigs-header'>My Gigs</h2>
                        <div className='new-gig-link-container'>
                            <a href='/gigs/new'>New Gig</a>
                        </div>
                    </div>
                    <div className='search-results-grid'>
                        {usersGigs.map((gig, idx) => (
                            <div className='gig-card-layout' key={idx}>
                            <div className='gig-wrapper'>
                                <a href={`/gigs/${gig.id}`} target="_blank" rel='noreferrer' className='media'>
                                    <div className='slider'>
                                        <div className='slide-preview'>
                                            <img src={gig.image} alt='gig' />
                                        </div>
                                    </div>
                                </a>
                                <h3>
                                    <a href={`/gigs/${gig.id}`} target="_blank" rel='noreferrer'>{gig.title}</a>
                                </h3>
                                <footer className='search-result-footer'>
                                    <a href={`/gigs/${gig.id}`} target="_blank" rel='noreferrer' className='search-result-price'>
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
            )}
        </div>
    )
}