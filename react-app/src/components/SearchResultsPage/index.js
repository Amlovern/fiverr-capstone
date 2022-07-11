import './SearchResultsPage.css';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import * as gigActions from '../../store/gig';

export default function SearchResultsPage() {
    const dispatch = useDispatch();
    const params = useParams();

    const gigs = useSelector((state) => state.gig.gigsByGigId);
    console.log('GIGS IN SEARCH RESULTS', gigs)

    const query = params.query;

    useEffect(() => {
        dispatch(gigActions.searchGigThunk(query))
    }, [dispatch, query])

    if (!gigs) {
        return null;
    };

    if (!gigs || gigs.length === 0) {
        return (
            <div>Sorry, no gigs could be found from your search.</div>
        );
    };

    return (
        <div>
            <div>
                {gigs.length === 0 && (
                    <div>Sorry, no gigs could be found from your search.</div>
                )}
            </div>
            <div>
                {gigs?.map((gig, idx) => (
                    <div key={idx}>
                        <p>{gig.title}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}