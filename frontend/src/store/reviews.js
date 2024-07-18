import { csrfFetch } from "./csrf";


/* --------------------
*Action Types
--------------------*/
const GET_SPOT_REVIEWS = '/reviews/GET_SPOT_REVIEWS'
const CREATE_REVIEW = '/reviews/CREATE_REVIEW'
const DELETE_REVIEW = '/reviews/DELETE_REVIEW'

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

const deleteAreview = (reviewId) => {
    return {
        type:DELETE_REVIEW,
        payload: reviewId
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


export const deleteReview = (reviewId) => async (dispatch) => {

const url = `/api/reviews/${reviewId}`
const method = 'DELETE'

const response = await csrfFetch(url, {method});

dispatch(deleteAreview(reviewId))

return response


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
case DELETE_REVIEW:{
    const newState = {...state}
    delete newState[action.payload]
    return newState;
}



    default:
        return state;
}
}


export default reviewsReducer;