import './SplashPage.css'

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as gigActions from '../../store/gig';

const SplashPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const gigsByCategoryId = useSelector((state) => state.gig.gigsByCategoryId);
    const categories = useSelector((state) => state.category.categoriesByCategoryId);

    const handleRedirect = (gigId) => {
        return history.push(`/gigs/${gigId}`)
    }

    useEffect(() => {
        dispatch(gigActions.getAllGigsThunk());
    }, [dispatch])

    return (
        <div className='splash-page-main'>
            <div className='splash-header'>Recently Added Gigs</div>
            {Object.keys(gigsByCategoryId)?.map((categoryId, idx) => (
                <div className='category-container' key={idx}>
                    <div className='category-header'>{categories[categoryId].name}</div>
                    <div className='category-gigs-container'>
                        {gigsByCategoryId[categoryId].map((gig, index) => (
                            <>
                                {index < 5 && (
                                    <div className='gig-container' key={index} onClick={()=>handleRedirect(gig.id)}>
                                        <div className='media'>
                                            <div className='slider'>
                                                <div className='slide-preview'>
                                                    <img className='gig-img' src={gig.image} alt='gig cover'/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='gig-title-header'>{gig.title}</div>
                                        <div className='gig-delivery-title'>Average Delivery Timeline: {gig.deliveryTimeline} Days</div>
                                        <div className='splash-gig-price-container'>
                                            <span className='gig-price-title'>Starting at</span>
                                            <span className='gig-price'>${gig.price}</span>
                                        </div>
                                    </div>
                                )}
                            </>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SplashPage;