import './AddOrderForm.css';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as orderActions from '../../store/order';

export default function AddOrderForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector((state) => state.session.user);

    return (
        <h1>This is the Add Order Form!</h1>
    )
}