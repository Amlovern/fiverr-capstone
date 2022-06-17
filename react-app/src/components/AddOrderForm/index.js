import './AddOrderForm.css';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import * as orderActions from '../../store/order';
import * as gigActions from '../../store/gig';

export default function AddOrderForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const currentUser = useSelector((state) => state.session.user);
    const gigs = useSelector((state) => state.gig);

    const gigId = params.gigId;
    const currentGig = gigs.gigsByGigId[gigId];
    const deliveryTimeline = currentGig?.deliveryTimeline;

    const [deliveryInstructions, setDeliveryInstructions] = useState('');
    const [orderErrors, setOrderErrors] = useState([]);

    useEffect(() => {
        dispatch(gigActions.getOneGigThunk(gigId))
    }, [dispatch])

    const addDays = (date, days) => {
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setOrderErrors([])
        let today = new Date(Date.now())

        const formData = {
            userId: currentUser.id,
            gigId: gigId,
            deliveryInstructions: deliveryInstructions,
            placed: new Date(today),
            due: new Date(addDays(today, deliveryTimeline))
        }

        try {
            const data = dispatch(orderActions.AddNewOrderThunk(formData));
            if (data) {
                data.then(res => history.push(`/orders/${res.id}`))
            } else {
                setOrderErrors(data.errors);
                return;
            }
        } catch (errorResponse) {
            setOrderErrors(['Something went wrong, please try again.']);
            console.log('Failed Request: ', errorResponse)
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        return history.goBack();
    };

    if (!currentUser || !gigs) {
        return null
    }

    return (
        <div className='add-order-form-page'>
            <div className='gig-detail-container'>
                <p className='order-gig-detail-header'>Gig Details</p>
                <p>{currentGig?.title}</p>
                <p>Expected Delivery Timeline: {currentGig?.deliveryTimeline} Day(s)</p>
                <p>Order Edit / Cancellation Timeline: {currentGig?.returnTimeline !== 0 ? `${currentGig?.returnTimeline} Day(s)` : 'No changes or cancellations can be made after order is placed.'}</p>
            </div>
            <form className='add-order-form' onSubmit={handleSubmit}>
                <h1 className='add-order-header'>Add Delivery Instructions for your Order!</h1>
                {orderErrors?.length > 0 && (
                    <div className='resource-error-container'>
                        {orderErrors?.map((error, idx) => (
                            <p className='resource-error-message' key={idx}>
                                {error?.split(': ')[1]}
                            </p>
                        ))}
                    </div>
                )}

                <div className='input-wrapper'>
                    <label className='label-for-input-field'>Delivery Instructions</label>
                    <textarea 
                        className='input-field'
                        type='text'
                        onChange={(e) => setDeliveryInstructions(e.target.value)}
                        value={deliveryInstructions}
                        placeholder='Delivery Instructions'
                        rows={5}
                    />
                </div>

                <div className='add-order-btn-container'>
                    <button
                        className='add-order-btn'
                        type='button'
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>
                <div className='add-order-btn-container'>
                    <button
                        className='add-order-btn'
                        type='submit'
                    >
                        Place Order
                    </button>
                </div>
            </form>
        </div>
    )
}