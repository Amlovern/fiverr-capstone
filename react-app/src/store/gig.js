const GET_GIGS = 'gig/GET_GIGS';
const GET_ONE_GIG = 'gig/GET_ONE_GIG';
const ADD_GIG = 'gig/ADD_GIG';
const UPDATE_GIG = 'gig/UPDATE_GIG';
const DELETE_GIG = 'gig/DELETE_GIG';

// REGULAR ACTION CREATORS
const getAllGigs = ({ gigsByOwnerId, gigsByCategoryId, gigsByGigId }) => ({
    type: GET_GIGS,
    payload: { gigsByOwnerId, gigsByCategoryId, gigsByGigId }
})

const getOneGig = (gigId, gig) => ({
    type: GET_ONE_GIG,
    payload: { gigId, gig },
});

const addGig = (gigId, ownerId, categoryId, gig) => ({
    type: ADD_GIG,
    payload: { gigId, ownerId, categoryId, gig }
})

const updateGig = (oldCategoryId, newCategoryId, gigId, updatedGig) => ({
    type: UPDATE_GIG,
    payload: { oldCategoryId, newCategoryId, gigId, updatedGig }
});

const deleteGig = (categoryId, ownerId, gigId) => ({
    type: DELETE_GIG,
    payload: { categoryId, ownerId, gigId }
})


// THUNK ACTION CREATORS
export const getAllGigsThunk = () => async (dispatch) => {
    const response = await fetch('/api/gig');

    if (response.ok) {
        const gigsData = await response.json();
        dispatch(getAllGigs(gigsData));
        return response;
    } else throw response;
};

export const getOneGigThunk = (gigId) => async (dispatch) => {
    const response = await fetch(`/api/gig/${gigId}`)

    if (response.ok) {
        const gigData = await response.json();
        dispatch(getOneGig(gigId, gigData));
        return response;
    } else throw response;
};

export const addNewGigThunk = (formData) => async (dispatch) => {
    console.log(formData)
    const response = await fetch('/api/gig', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ownerId: formData.ownerId,
            categoryId: formData.categoryId,
            title: formData.title,
            imageUrl: formData.image,
            queue: formData.queue,
            description: formData.description,
            price: formData.price,
            deliveryTimeline: formData.deliveryTimeline,
            returnTimeline: formData.returnTimeline
        })
    });

    if (response.ok) {
        const newGig = await response.json();
        dispatch(addGig(newGig.id, newGig.ownerId, newGig.categoryId, newGig));
        return newGig;
    } else if (response.status < 500) {
        const resBody = await response.json();
        if (resBody.errors) {
            return resBody.errors
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const updateOneGigThunk = (gig, formData) => async (dispatch) => {
    let oldCategoryId = gig.categoryId;

    const response = await fetch(`/api/gig/${gig.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ownerId: formData.ownerId,
            categoryId: formData.categoryId,
            queue: formData.queue,
            description: formData.description,
            price: formData.price,
            deliveryTimeline: formData.deliveryTimeline,
            returnTimeline: formData.returnTimeline
        })
    })

    if (response.ok) {
        const updatedGig = await response.json();
        dispatch(updateGig(oldCategoryId, updatedGig.categoryId, gig.id, updatedGig))
        return null;
    } else if (response.status < 500) {
        const resBody = await response.json();
        if (resBody.errors) {
            return resBody.errors
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const deleteOneGigThunk = (categoryId, ownerId, gigId) => async (dispatch) => {
    const response = await fetch(`/api/gig/${gigId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const resBody = await response.json();
        if (resBody.message === 'Success') {
            dispatch(deleteGig(categoryId, ownerId, gigId));
        }
        return response;
    } else throw response;
};

const initialState = {
    gigsByOwnerId: {},
    gigsByCategoryId: {},
    gigsByGigId: {}
}
/*
gigState = {
    gigsByOwnerId: {
        ownerId1: [gigObj1, gigObj2, gigObj3],
        ownerId2: [gigObj1, gigObj2, gigObj3],
        ownerId3: [gigObj1, gigObj2, gigObj3]
    },
    gigsByCategoryId: {
        categoryId1: [gigObj1, gigObj2, gigObj3],
        categoryId2: [gigObj1, gigObj2, gigObj3],
        categoryId3: [gigObj1, gigObj2, gigObj3]
    }
    gigsByGigId: {
        gigId1: gigObj1,
        gigId2: gigObj2,
        gigId3: gigObj3
    }
}
*/

const gigReducer = (state = initialState, action) => {
    Object.freeze(state);
    Object.freeze(state.gigsByOwnerId);
    Object.freeze(state.gigsByCategoryId);
    Object.freeze(state.gigsByGigId);

    // Deep Clone State:
    let gigsByOwnerId = {};
    let gigsByCategoryId = {};
    let gigsByGigId = {};

    Object.keys(state.gigsByOwnerId).forEach((key) => {
        let gigArr = [];
        state.gigsByOwnerId[key].forEach((gig) => {
            gigArr.push({ ...gig });
        });
        gigsByOwnerId[key] = gigArr;
    });

    Object.keys(state.gigsByCategoryId).forEach((key) => {
        let gigArr = [];
        state.gigsByCategoryId[key].forEach((gig) => {
            gigArr.push({ ...gig });
        });
        gigsByCategoryId[key] = gigArr;
    });

    Object.keys(state.gigsByGigId).forEach((key) => {
        let gig = state.gigsByGigId[key];
        gigsByGigId[gig.id] = { ...gig };
    });

    const newState = {
        ...state,
        gigsByOwnerId,
        gigsByCategoryId,
        gigsByGigId
    };

    let gigId;
    let ownerId;
    let categoryId;
    let index;
    let ownerIndex;

    switch(action.type) {
        case GET_GIGS:
            newState.gigsByOwnerId = action.payload.gigsByOwnerId;
            newState.gigsByCategoryId = action.payload.gigsByCategoryId;
            newState.gigsByGigId = action.payload.gigsByGigId

            return newState;
        
        case GET_ONE_GIG:
            gigId = action.payload.gigId

            newState.gigsByGigId[gigId] = action.payload.gig;
            return newState;

        case ADD_GIG:
            gigId = action.payload.gigId;
            ownerId = action.payload.ownerId;
            categoryId = action.payload.categoryId;

            if (newState.gigsByOwnerId[ownerId]) {
                newState.gigsByOwnerId[ownerId].push(action.payload.gig);
            } else {
                newState.gigsByOwnerId[ownerId] = [action.payload.gig]
            }
            newState.gigsByCategoryId[categoryId].push(action.payload.gig);
            newState.gigsByGigId[gigId] = action.payload.gig

            return newState

        case UPDATE_GIG:
            let oldCategoryId = action.payload.oldCategoryId;
            let newCategoryId = action.payload.newCategoryId;
            gigId = action.payload.gigId;
            ownerId = action.payload.updatedGig.ownerId

            if (oldCategoryId === newCategoryId) {
                // find index of gig in gigsByCategoryId
                index = newState.gigsByCategoryId[newCategoryId].findIndex(
                    (gig) => gig.id === parseInt(gigId)
                );
                // replace gig in gigsByCategoryId array
                newState.gigsByCategoryId[newCategoryId][index] = action.payload.updatedGig;
            } else {
                let oldIndex = newState.gigsByCategoryId[oldCategoryId].findIndex(
                    (gig) => gig.id === parseInt(gigId)
                );
                newState.gigsByCategoryId[oldCategoryId].splice(oldIndex, 1);
                if (newState.gigsByCategoryId[newCategoryId]) {
                    newState.gigsByCategoryId[newCategoryId].push(action.payload.updatedGig);
                } else {
                    newState.gigsByCategoryId[newCategoryId] = [action.payload.updatedGig]
                }
            }

            ownerIndex = newState.gigsByOwnerId[ownerId].findIndex(
                (gig) => gig.id === parseInt(gigId)
            )
            newState.gigsByOwnerId[ownerId][ownerIndex] = action.payload.updatedGig

            newState.gigsByGigId[gigId] = action.payload.updatedGig

            return newState

        case DELETE_GIG:
            categoryId = action.payload.categoryId;
            gigId = action.payload.gigId;
            ownerId = action.payload.ownerId;

            // find index of gig in gigsByCategoryId
            let categoryIndex = newState.gigsByCategoryId[categoryId].findIndex(
                (gig) => gig.id === parseInt(gigId)
            );
            // remove gig from gigsByCategoryId array
            newState.gigsByCategoryId[categoryId].splice(categoryIndex, 1);

            // find index of gig in gigsByOwnerId
            ownerIndex = newState.gigsByOwnerId[ownerId].findIndex(
                (gig) => gig.id === parseInt(gigId)
            );
            // remove gig from gigsByOwnerId array
            newState.gigsByOwnerId[ownerId].splice(ownerIndex, 1)

            // remove gig from gigsByGigId
            delete newState.gigsByGigId[gigId];

            return newState;

        default:
            return state;
    }
};

export default gigReducer;


// TEST THUNKS:

// GET ALL GIGS
// window.store.dispatch(window.gigActions.getAllGigsThunk())

// GET ONE GIG
// window.store.dispatch(window.gigActions.getOneGigThunk(1))

// ADD GIG
// window.store.dispatch(window.gigActions.addNewGigThunk({
//     ownerId: 1,
//     categoryId: 3,
//     title: 'Test Gig',
//     imageUrl: 'https://www.denofgeek.com/wp-content/uploads/2013/07/steins-gate-main.jpg',
//     description: 'This is a test gig for the redux store.',
//     price: 10,
//     deliveryTimeline: 9,
//     returnTimeline: 3
// })).catch(async (res) => { const resBody = await res.json(); console.log(res, resBody) })

// UPDATE GIG
// window.store.dispatch(
//     window.gigActions.updateOneGigThunk(window.store.getState().gig.gigsByGigId['5'], {
//         ownerId: 1,
//         categoryId: 2,
//         description: 'This is an updated test gig for the redux store.',
//         price: 15,
//         deliveryTimeline: 12,
//         returnTimeline: 4
// })).catch(async (res) => { const resBody= await res.json(); console.log(res,resBody)})

// DELETE GIG
// window.store.dispatch(window.gigActions.deleteOneGigThunk(2, 1, 5))
// .catch(async (res) => { const resBody= await res.json(); console.log(res,resBody)})