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

    console.log(currentGig?.image)


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
            {/* <h1>This is the Gig Detail Page for Gig # {gigId}!</h1> */}
            <div className='main'>
                <div className='gig-header-container'>
                    <div className='gig-category'>Category: {categories[currentGig?.categoryId]?.name}</div>
                    <div className='gig-title'>{currentGig?.title}</div>
                    <div className='gig-header-subdetails'>
                        <div className='gig-header-owner'>{gigOwner?.username}</div>
                        <div className='gig-header-queue'>{currentGig?.queue} Orders in queue</div>
                    </div>
                </div>
                <div className='gig-image-container'>
                    <img className='gig-image' src={currentGig?.image} alt='gig'></img>
                </div>
                <div className='gig-description-container'>
                    <header>
                        <h2 className='gig-description-header'>
                            About This Gig
                        </h2>
                    </header>
                    <div className='gig-description-wrapper'>
                        <div className='gig-description-content'>
                            {currentGig?.description}
                        </div>
                    </div>
                </div>
            </div>

            <div className='gig-pricing-delivery-details-outer'>
                <div className='gig-pricing-delivery-details-inner'>
                    <aside className='sidebar-content'>
                        <div className='packages-tabs'>
                            <div className='gig-price-container'>
                                <span className='gig-price-header'>Price</span>
                                <span className='gig-price'>${currentGig?.price}</span>
                            </div>
                            <div className='gig-delivery-container'>
                                <div>
                                    <span className="material-symbols-outlined gig-delivery-icon">
                                        schedule
                                    </span>
                                    <span className='gig-delivery-header'>Expected Delivery Timeline:</span>
                                </div>
                                <span className='gig-delivery'>{currentGig?.deliveryTimeline} Days</span>
                            </div>
                            <div className='gig-cancellation-container'>
                                <div>
                                    <span className='material-symbols-outlined gig-cancel-icon'>
                                        cancel
                                    </span>
                                    <span className='gig-cancellation-header'>Cancellation Timeline:</span>
                                </div>
                                <span className='gig-cancellation'>{currentGig?.returnTimeline} Days</span>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}