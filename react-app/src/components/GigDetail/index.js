import './GigDetail.css'

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import * as gigActions from '../../store/gig';
import * as sessionActions from '../../store/session';
 
export default function GigDetail() {
    const dispatch = useDispatch();
    const history = useHistory();

    const gigs = useSelector((state) => state.gig);
    const categories = useSelector((state) => state.category.categoriesByCategoryId)
    const gigOwner = useSelector((state) => state.session.gigUser);
    const sessionUser = useSelector((state) => state.session.user);

    const [showDelete, setShowDelete] = useState(false)

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

    const handleDelete = (e) => {
        e.preventDefault();
        
        const errors = dispatch(gigActions.deleteOneGigThunk(currentGig?.categoryId, gigOwner?.id, gigId));
        if (errors) {
            errors.then(res => history.push('/'))
        } else {
            console.log(errors)
        }
    }

    const displayDelete = (e) => {
        e.preventDefault()
        if (showDelete === true) {
            setShowDelete(false)
        } else {
            setShowDelete(true)
        }
    }

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
                        {sessionUser?.id === gigOwner?.id && (
                            <>
                                <div>
                                    <button
                                        className='gig-delete-btn'
                                        type='button'
                                        onClick={displayDelete}
                                        >
                                        Delete This Gig
                                    </button>
                                </div>
                                {showDelete && (
                                    <div>
                                        <span className='delete-warning'>Are you sure you want to delete this gig and cancel any outstanding orders?</span>
                                        <button
                                            className='cancel-btn'
                                            type='button'
                                            onClick={displayDelete}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className='confirm-btn'
                                            type='button'
                                            onClick={handleDelete}
                                        >
                                            Confirm
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </aside>
                </div>
            </div>
        </div>
    )
}