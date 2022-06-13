const GET_ORDERS = 'order/GET_ORDERS';
const GET_ONE_ORDER = 'order/GET_ONE_ORDER';
const ADD_ORDER = 'order/ADD_ORDER';
const UPDATE_ORDER = 'order/UPDATE_ORDER';
const DELETE_ORDER = 'order/DELETE_ORDER';

// REGULAR ACTION CREATORS
const getAllOrders = ({ ordersByOrderId }) => ({
    type: GET_ORDERS,
    payload: { ordersByOrderId }
});

const getOneOrder = (orderId, orderData) => ({
    type: GET_ONE_ORDER,
    payload: { orderId, orderData }
});

const addOrder = (orderId, order) => ({
    type: ADD_ORDER,
    payload: { orderId, order }
});

const updateOrder = (orderId, updatedOrder) => ({
    type: UPDATE_ORDER,
    payload: { orderId, updatedOrder }
});

const deleteOrder = (orderId) => ({
    type: DELETE_ORDER,
    payload: { orderId }
})

// THUNK ACTION CREATORS
export const getAllOrdersThunk = (userId) => async (dispatch) => {
    const response = await fetch(`/api/user/${userId}`);

    if (response.ok) {
        const ordersData = await response.json();
        dispatch(getAllOrders(ordersData));
        return response;
    } else throw response;
};

export const getOneOrderThunk = (orderId) => async (dispatch) => {
    const response = await fetch(`/api/${orderId}`);

    if (response.ok) {
        const orderData = await response.json();
        dispatch(getOneOrder(orderId, orderData));
        return response;
    } else throw response;
};

export const AddNewOrderThunk = (formData) => async (dispatch) => {
    const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: formData.userId,
            gigId: formData.gigId,
            deliveryInstructions: formData.deliveryInstructions,
            placed: formData.placed,
            due: formData.due
        })
    });

    if (response.ok) {
        const newOrder = await response.json();
        dispatch(addOrder(newOrder.id, newOrder));
        return newOrder;
    } else if (response.status < 500) {
        const resBody = await response.json();
        if (resBody.errors) {
            return resBody.errors
        }
    } else {
        return ['An error occured. Please try again.']
    }
};

export const updateOneOrderThunk = (order, formData) => async (dispatch) => {
    const response = await fetch(`/api/order/${order.id}`, {
        method: 'PATCH',
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: formData.userId,
            gigId: formData.gigId,
            deliveryInstructions: formData.deliveryInstructions,
            placed: formData.placed,
            due: formData.due
        })
    });

    if (response.ok) {
        const updatedOrder = await response.json();
        dispatch(updateOrder(order.id, updatedOrder));
        return updatedOrder;
    } else if (response.status < 500) {
        const resBody = await response.json();
        if (resBody.errors) {
            return resBody.errors
        }
    } else {
        return ['An error occured. Please try again.']
    }
};

export const deleteOneOrderThunk = (orderId) => async (dispatch) => {
    const response = await fetch(`/api/order/${orderId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const resBody = await response.json();
        if (resBody.message === 'Success') {
            dispatch(deleteOrder(orderId));
        }
        return response;
    } else throw response;
};

const initialState = {
    ordersByOrderId: {}
}

/*
orderState = {
    ordersByOrderId: {
        orderId1: orderObj1,
        orderId2: orderObj2,
        orderId3: orderObj3
    }
}
*/

const orderReducer = (state = initialState, action) => {
    Object.freeze(state);
    Object.freeze(state.ordersByOrderId);

    // Deep Clone State:
    let ordersByOrderId = {};

    Object.keys(state.ordersByOrderId).forEach((key) => {
        let orderArr = [];
        state.ordersByOrderId[key].forEach((order) => {
            orderArr.push({ ...order });
        });
        ordersByOrderId[key] = orderArr;
    });

    const newState = {
        ...state,
        ordersByOrderId
    }

    let orderId = action.payload.orderId;

    switch(action.type) {
        case GET_ORDERS:
            newState.ordersByOrderId = action.payload.ordersByOrderId;

            return newState;

        case GET_ONE_ORDER:
            // orderId = action.payload.orderId;

            newState.ordersByOrderId[orderId] = action.payload.orderData;
            return newState;

        case ADD_ORDER:
            // orderId = action.payload.orderId;

            newState.ordersByOrderId[orderId] = action.payload.order

            return newState;

        case UPDATE_ORDER:
            // orderId = action.payload.orderId;

            newState.ordersByOrderId[orderId] = action.payload.updatedOrder;

            return newState;

        case DELETE_ORDER:
            // orderId = action.payload.orderId;

            delete newState.ordersByOrderId[orderId];

            return newState;

        default:
            return state;
    };
};

export default orderReducer;