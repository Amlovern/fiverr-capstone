import './UpdateOrderForm.css';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import * as orderActions from '../../store/order';

export default function UpdateOrderForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    const currentUser = useSelector((state) => state.session.user);
    const orders = useSelector((state) => state.order.ordersByOrderId);
    const gigs = useSelector((state) => state.gig);

    const orderId = params.orderId;
    const currentOrder = orders[orderId];
    const currentGig = gigs.gigsByGigId[currentOrder?.gigId];

    const [deliveryInstructions, setDeliveryInstructions] = useState(currentOrder?.deliveryInstructions);
    const [updateErrors, setUpdateErrors] = useState([]);

    const dueDate = new Date(currentOrder?.due).toDateString();
    const placedDate = new Date(currentOrder?.placed).toDateString();

    useEffect(() => {
        dispatch(orderActions.getOneOrderThunk(currentOrder?.id))
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setUpdateErrors([]);

        const formData = {
            userId: currentUser.id,
            gigId: currentOrder.gigId,
            deliveryInstructions: deliveryInstructions,
            placed: new Date(currentOrder.placed),
            due: new Date(currentOrder.due)
        };

        try {
            const data = dispatch(orderActions.updateOneOrderThunk(currentOrder, formData));
            if (data) {
                data.then((res) => {
                    if (res.id) {
                        data.then(res => history.push(`/orders/${res.id}`));
                    } else {
                        setUpdateErrors(res);
                        return;
                    }
                })
            }
        } catch (errorResponse) {
            setUpdateErrors(['Something went wrong, please try again.']);
            console.log('Failed Request: ', errorResponse);
        }
    };

    const handleCancel = (e) => {
        e.preventDefault();
        return history.goBack();
    };

    if (!orders || !currentUser) {
        return null;
    };

    return (
        <div className='update-order-form-page'>
            <div className='gig-detail-container'>
                <p className='order-gig-detail-header'>Details about your Order</p>
                <p>{currentGig?.title}</p>
                <p>Placed on: {placedDate}</p>
                <p>Due Date: {dueDate}</p>
            </div>

            <form className='update-order-form' onSubmit={handleSubmit}>
                {updateErrors?.length > 0 && (
                    <div className='resource-error-container'>
                        {updateErrors?.map((error, idx) => (
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
                        onChange = {(e) => setDeliveryInstructions(e.target.value)}
                        value={deliveryInstructions}
                        placeholder='Delivery Instructions'
                        rows={5}
                    />
                </div>

                <div className='update-order-btn-container'>
                    <button
                        className='update-order-btn'
                        type='button'
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>
                <div className='update-order-btn-container'>
                    <button
                        className='update-order-btn'
                        type='submit'
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}