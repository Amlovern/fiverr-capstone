import './MyGigsPage.css';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as gigActions from '../../store/gig';

export default function MyGigsPage() {
    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.session.user);
    const allGigs = useSelector((state) => state.gig.gigsByOwnerId);

    const [usersGigs, setUsersGigs] = useState([])

    useEffect(() => {
        dispatch(gigActions.getAllGigsThunk())
    }, [dispatch])

    useEffect(() => {
        setUsersGigs(allGigs[sessionUser.id]);
    }, [allGigs, sessionUser.id])

    if (!sessionUser) {
        return null;
    };

    if (!usersGigs) {
        return (
            <div className='my-gigs-page'>
                <div className='my-gigs-header-container'>
                    <h2 className='my-gigs-header'>{sessionUser.username}'s Gigs</h2>
                </div>
                <div className='no-gigs-found'>
                    <h3 className='no-gigs-header'>It seems you don't have any active Gigs</h3>
                    <p className='no-gigs-subheader'>Click here to create your first Gig:</p>
                    <div className='new-gig-link-container'>
                        <a href='/gigs/new'>New Gig</a>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='my-gigs-page'>
            <div className='my-gigs-header-container'>
                <h2 className='my-gigs-header'>{sessionUser.username}'s Gigs</h2>
                <div className='new-gig-link-container'>
                    <a href='/gigs/new'>New Gig</a>
                </div>
            </div>
            {usersGigs?.length > 0 && (
                <div>
                    <div className='search-results-grid'>
                        {usersGigs.map((gig, idx) => (
                            <div className='gig-card-layout' key={idx}>
                            <div className='gig-wrapper'>
                                <a href={`/gigs/${gig.id}`} target="_blank" rel='noreferrer' className='media'>
                                    <div className='slider'>
                                        <div className='slide-preview'>
                                            <img className='gig-image' src={gig.image} alt='gig' />
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