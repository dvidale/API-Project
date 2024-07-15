import { csrfFetch } from "./csrf";

const GET_SPOTS = '/spots/GET_SPOTS'

/* --------------------
*Regular Action Creators
--------------------*/

const getAllSpots = (spots) => {
    return {
        type: GET_SPOTS,
        payload: spots
    }
}


/* ------------------
* Thunks
--------------------*/

export const getSpots = () => async (dispatch) =>{
console.log(">>>>hitting the thunk");
    const response = await csrfFetch('/api/spots')
    
    const data = await response.json()
    
    dispatch(getAllSpots(data.Spots))
    return data.spots;
    
    
    
    }





/* ------------------
*Reducers
--------------------*/

const initialState = {}

function spotsReducer(state = initialState, action) {
switch(action.type){
    case GET_SPOTS:{
        const allSpots = {}
        action.payload.forEach(spot =>{
            allSpots[spot.id] = spot;
         })
         return {...state, ...allSpots};
    } 
       
        default:
            return state;
}
}

export default spotsReducer