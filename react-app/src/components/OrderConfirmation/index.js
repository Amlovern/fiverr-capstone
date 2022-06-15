import './OrderConfirmation.css';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import * as gigActions from '../../store/gig';
import * as orderActions from '../../store/order';

export default function OrderConfirmation() {
    const params = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const gigs = useSelector((state) => state.gig);
    const sessionUser = useSelector((state) => state.session.user);
    const orders = useSelector((state) => state.order.ordersByOrderId);

    const [showDelete, setShowDelete] = useState(false);

    const orderId = params.orderId;
    const currentOrder = orders[orderId];
    const currentGig = gigs.gigsByGigId[currentOrder?.gigId]

    useEffect(() => {
        dispatch(gigActions.getAllGigsThunk());
        dispatch(orderActions.getAllOrdersThunk(sessionUser?.id));
    }, [dispatch]);

    const addDays = (date, days) => {
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    const dueDate = new Date(currentOrder?.due).toDateString();
    const placedDate = new Date(currentOrder?.placed).toDateString();
    const cancelDate = addDays(currentOrder?.placed, currentGig?.returnTimeline).toDateString()

    const handleDelete = (e) => {
        e.preventDefault();

        const errors = dispatch(orderActions.deleteOneOrderThunk(currentOrder?.id));
        if (errors) {
            errors.then(res => history.push('/'))
        } else {
            console.log(errors)
        }
    };

    const displayDelete = (e) => {
        e.preventDefault();
        if (showDelete === true) {
            setShowDelete(false)
        } else {
            setShowDelete(true)
        }
    };

    if (!gigs || !currentOrder) {
        return null
    };

    return (
        // <h2>This is the Order Confirmation Page!</h2>
        <div className='main-order-confirmation-container'>
            <div className='main'>
                <div className='order-confirmation-header'>Order Confirmation # {currentOrder.id}</div>
                <div className='gig-image-container'>
                    <img className='gig-image' src={currentGig?.image} alt='Gig' />
                </div>

                <div className='order-detail-container'>
                    <div className='order-detail-section'>
                        <div className='order-detail-label'>Order Placed On:</div>
                        <span className='order-detail'>{placedDate}</span>
                    </div>
                    <div className='order-detail-section'>
                        <div className='order-detail-label'>Estimated Due Date:</div>
                        <span className='order-detail'>{dueDate}</span>
                    </div>
                    <div className='order-detail-section'>
                        <div className='order-detail-label'>Last Day to Make Changes or Cancel: </div>
                        <span className='order-detail'>{cancelDate}</span>
                    </div>
                    <div className='order-detail-section'>
                        <div className='order-detail-label'>Delivery Instructions:</div>
                        <span className='order-detail'>{currentOrder.deliveryInstructions}</span>
                    </div>
                </div>

                <div className='order-confirmation-btns-container'>
                    {sessionUser?.id === currentOrder?.userId && (
                        <>
                            <div>
                                <button
                                    className='order-update-btn'
                                    type='button'
                                    onClick={'Do Nothing'}
                                >
                                    Update This Order
                                </button>
                            </div>

                            {!showDelete && (
                                <div>
                                    <button
                                        className='order-cancel-btn'
                                        type='button'
                                        onClick={displayDelete}
                                    >
                                        Cancel This Order
                                    </button>
                                </div>
                            )}
                            {showDelete && (
                                <div className='cancel-order-container'>
                                    <span className='cancel-warning'>Are you sure you want to cancel this order?</span>
                                    <button
                                        className='cancel-cancel-btn'
                                        type='button'
                                        onClick={displayDelete}
                                    >
                                        Do Not Cancel
                                    </button>
                                    <button
                                        className='cancel-confirm-btn'
                                        type='button'
                                        onClick={handleDelete}
                                    >
                                        Cancel Order
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}