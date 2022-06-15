import './OrdersPage.css';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import * as sessionActions from '../../store/session';
import * as orderActions from '../../store/order';

export default function OrdersPage() {
    const dispatch = useDispatch();
    const params = useParams();

    const sessionUser = useSelector((state) => state.session.user);
    const orders = useSelector((state) => state.order.ordersByOrderId);

    useEffect(() => {
        dispatch(orderActions.getAllOrdersThunk(sessionUser?.id));
    }, [dispatch])

    let ordersArr = [];
    useEffect(() => {
        if (orders) {
            Object.keys(orders).forEach((key) => {
                ordersArr.push(orders[key]);
            })
        }
    }, [orders])

    if (!sessionUser) {
        return null
    }

    return (
        <div className='user-orders-container'>
            <div className='main'>
                <div className='user-orders-header'>
                    <h2>{sessionUser.username}'s Orders</h2>
                </div>
            </div>
        </div>
    )
}