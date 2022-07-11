import './SearchResultsPage.css';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import * as gigActions from '../../store/gig';

export default function SearchResultsPage() {
    const dispatch = useDispatch();
    const params = useParams();

    console.log('PARAMS', params.query)

    return (
        <div>Search Results</div>
    )
}