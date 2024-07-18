import { csrfFetch } from "./csrf";

/* --------------------
*Action Types
--------------------*/

const GET_SPOT_DETAILS = '/spots/GET_SPOT_DETAILS'



/* --------------------
*Regular Action Creators
--------------------*/

const getOneSpotDetails = (spot) => {
    return {
        type: GET_SPOT_DETAILS,
        payload: spot
    }
}


/* ------------------
* Thunks
--------------------*/

export const getSpotDetails = (spotId) => async (dispatch) =>{

    const response = await csrfFetch(`/api/spots/${spotId}`)

    const data = await response.json()

    dispatch(getOneSpotDetails(data))
    return data;
}

/* ------------------
*Reducers
--------------------*/


const initialState = {}

function spotDetailsReducer(state = initialState, action) {
switch(action.type){
    
    case GET_SPOT_DETAILS:{
        const newState = {}
        newState[action.payload.id] = action.payload;
        return newState;
    }
    
        default:
            return state;
}
}

export default spotDetailsReducer