import { csrfFetch } from "./csrf";


/* --------------------
*Action Types
--------------------*/
const GET_SPOT_REVIEWS = '/reviews/GET_SPOT_REVIEWS'
const CREATE_REVIEW = '/reviews/CREATE_REVIEW'


/* --------------------
*Regular Action Creators
--------------------*/

const getAllReviewsForSpot = (reviews) => {
    return {
        type: GET_SPOT_REVIEWS,
        payload: reviews
    }
}

const createAReview = (review) => {
    return {
        type: CREATE_REVIEW,
        payload: review
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

export const createReview = (reviewData, spotId, user) => async (dispatch) =>{

    const url = `/api/spots/${spotId}/reviews`
    const method = 'POST'
    const body = JSON.stringify(reviewData)
    const options = {method, body}

    await csrfFetch(url, options)

   const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

   const allSpotReviews = await response.json()
  
   const userReview = allSpotReviews.Reviews.filter( review => review.User.id === user.id)

   dispatch(createAReview(userReview[0]))
    return userReview;


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
case CREATE_REVIEW:{
    const newState = {...state}
    const newReview = action.payload;
    newState[newReview.id] = newReview
    return newState;
}




    default:
        return state;
}
}


export default reviewsReducer;