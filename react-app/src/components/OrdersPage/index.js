import './OrdersPage.css';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as orderActions from '../../store/order';
import * as gigActions from '../../store/gig';

export default function OrdersPage() {
    const dispatch = useDispatch();
    const history = useHistory()

    const sessionUser = useSelector((state) => state.session.user);
    const ordersState = useSelector((state) => state.order.ordersByOrderId);
    const gigsByGigId = useSelector((state) => state.gig.gigsByGigId);

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        dispatch(orderActions.getAllOrdersThunk(sessionUser?.id));
        dispatch(gigActions.getAllGigsThunk());
    }, [dispatch])

    useEffect(() => {
        let ordersArr = [];
        if (ordersState) {
            Object.keys(ordersState).forEach((key) => {
                ordersArr.push(ordersState[key]);
            })
            setOrders(ordersArr);
        }
    }, [ordersState])

    if (!sessionUser) {
        return null
    }

    return (
        <div className='user-orders-container'>
            <div className='user-orders-outer-container'>
                <div className='user-orders-header'>
                    <h2>{sessionUser.username}'s Orders</h2>
                </div>
                <div className='user-orders-subheader'>
                    <h3>Hover Over a Card to View Order Details</h3>
                </div>
                <div className='orders-container'>
                    {orders?.map((order, idx) => (
                        <div className='order-details-container' key={idx}>
                            <div className='overlay' onClick={() => history.push(`/orders/${order?.id}`)}>
                                <div className='items'></div>
                                <div className='items head'>
                                    <p className='order-detail-label'>Gig Title:</p>
                                    <p className='order-detail'>{gigsByGigId[order?.gigId]?.title}</p>
                                    <hr></hr>
                                </div>
                                <div className='items details'>
                                    <p className='order-detail-label'>Order Placed On:</p>
                                    <span className='order-detail'>{new Date(order?.placed).toDateString()}</span>
                                    <p className='order-detail-label'>Order Due By:</p>
                                    <span className='order-detail'>{new Date(order?.due).toDateString()}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}