import './SearchBar.css';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as gigActions from '../../store/gig';

import magnifyingGlass from '../../images/magnifying-glass.svg';

export default function SearchBar() {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUrl = window.location.href;

    const gigs = useSelector((state) => state.gig.gigsByGigId);

    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (query === '') {
            alert("Please enter a valid search.")
        } else {
            history.push(`/search/${query}`);
        }
    }

    useEffect(() => {
        setQuery('');
    }, [currentUrl])

    // To Do: for predictive search implementation
    // useEffect(() => {
    //     dispatch(gigActions.getAllGigsThunk());
    // }, [dispatch])

    if (!gigs) {
        return null;
    };

    return (
        <div className='header-search'>
            <form className='search-form' onSubmit={handleSearch}>
                <input 
                    type='search'
                    autoComplete='off'
                    className='search-input'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder='What service are you looking for today?'
                />
                <button className='search-btn'>
                    <img
                        src={magnifyingGlass}
                        alt='magnifying glass'
                        className='search-btn-icon'
                        onClick={handleSearch}
                    />
                </button>
            </form>
        </div>
    )
}