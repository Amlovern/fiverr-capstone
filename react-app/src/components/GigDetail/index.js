import './GigDetail.css'

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import * as gigActions from '../../store/gig';
import * as sessionActions from '../../store/session';
 
export default function GigDetail() {
    const dispatch = useDispatch();
    const gigs = useSelector((state) => state.gig);
    const categories = useSelector((state) => state.category.categoriesByCategoryId)
    const gigOwner = useSelector((state) => state.session.gigUser)
    const params = useParams();
    const gigId = params.gigId;
    const currentGig = gigs.gigsByGigId[gigId];


    useEffect(() => {
        dispatch(gigActions.getAllGigsThunk())
    }, [dispatch])
    
    useEffect(() => {
        if (!currentGig) {
            return null
        } else {
            dispatch(sessionActions.getUserThunk(currentGig.ownerId))
        }
    }, [currentGig])

    if (!gigs) {
        return null
    }

    return (
        <div className='main-gig-detail-container'>
            <h1>This is the Gig Detail Page for Gig # {gigId}!</h1>
            <div className='gig-header-container'>
                <div className='gig-category'>Category: {categories[currentGig?.categoryId]?.name}</div>
                <div className='gig-title'>{currentGig?.title}</div>
                <div className='gig-header-subdetails'>
                    <div className='gig-header-owner'>{gigOwner?.username}</div>
                    <div className='gig-header-queue'>{currentGig?.queue} Orders in queue</div>
                </div>
            </div>
            <div className='gig-image'>Here will be an image!</div>
            <div className='gig-pricing-delivery-details'>This Gig cost money!</div>
            <div className='gig-description-container'>Here are some nice details about this Gig!</div>
        </div>
    )
}