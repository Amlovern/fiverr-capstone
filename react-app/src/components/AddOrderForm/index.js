import './AddOrderForm.css';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import * as orderActions from '../../store/order';

export default function AddOrderForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const currentUser = useSelector((state) => state.session.user);
    const gigs = useSelector((state) => state.gig);

    const gigId = params.gigId;
    const currentGig = gigs.gigsByGigId[gigId];
    const deliveryTimeline = currentGig.deliveryTimeline;

    const [deliveryInstructions, setDeliveryInstructions] = useState('');
    const [orderErrors, setOrderErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setOrderErrors([])

        const formData = {
            userId: currentUser.id,
            gigId: gigId,
            deliveryInstructions: deliveryInstructions,
            placed: Date.now(),
            due
        }
    }

    return (
        <h1>This is the Add Order Form!</h1>
    )
}