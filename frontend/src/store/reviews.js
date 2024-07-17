import { csrfFetch } from "./csrf";


/* --------------------
*Action Types
--------------------*/
const GET_SPOT_REVIEWS = '/reviews/GET_SPOT_REVIEWS'



/* --------------------
*Regular Action Creators
--------------------*/

const getAllReviewsForSpot = (reviews) => {
    return {
        type: GET_SPOT_REVIEWS,
        payload: reviews
    }
}



/* ------------------
* Thunks
--------------------*/

export const getReviewsForSpot = (spotId) => async (dispatch) =>{

const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

const data = await response.json();

dispatch(getAllReviewsForSpot(data.Reviews))
return data.Reviews;

}



/* ------------------
*Reducers
--------------------*/

const initialState = {}

function reviewsReducer(state = initialState, action){
switch(action.type){
case GET_SPOT_REVIEWS:{
    const newState = {}
    action.payload.forEach(review => {
    newState[review.id] = review;        
    });
    return newState;
}




    default:
        return state;
}
}


export default reviewsReducer;