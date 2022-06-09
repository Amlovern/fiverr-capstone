const GET_CATEGORIES = 'category/GET_CATEGORIES'

const getAllCategories = (categoriesData) => ({
    type: GET_CATEGORIES,
    payload: categoriesData
})

export const getAllCategoriesThunk = () => async (dispatch) => {
    const response = await fetch('/api/category');

    if (response.ok) {
        const categoriesData = await response.json()
        dispatch(getAllCategories(categoriesData));
        return response;
    } else throw response;
};

const initialState = {
    categoriesByCategoryId: {}
}
/*
categoriesState = {
    categoriesByCategoryId: {
        categoryId1: categoryObj1,
        categoryId2: categoryObj2
    }
}
*/

const categoryReducer = (state = initialState, action) => {
    Object.freeze(state);
    Object.freeze(state.categoriesByCategoryId);

    // Deep Clone State:
    let categoriesByCategoryId = {}

    const newState = {
        ...state,
        categoriesByCategoryId: categoriesByCategoryId
    }

    Object.keys(state).forEach((key) => {
        let category = state[key];
        if (category.id) {
            newState[category.id] = { ...category }
        }
    })

    switch (action.type) {
        case GET_CATEGORIES:
            newState.categoriesByCategoryId = action.payload
            return newState

        default:
            return state
    }
}

export default categoryReducer;

// TEST THUNKS:

// GET ALL CATEGORIES
// window.store.dispatch(window.categoryActions.getAllCategoriesThunk())