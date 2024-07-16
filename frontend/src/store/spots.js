import { csrfFetch } from "./csrf";

const GET_SPOTS = '/spots/GET_SPOTS'
const ADD_SPOT = '/spots/ADD_SPOT'

/* --------------------
*Regular Action Creators
--------------------*/

const getAllSpots = (spots) => {
    return {
        type: GET_SPOTS,
        payload: spots
    }
}

const addSpot = (spot) => {
return {
    type: ADD_SPOT,
    payload: spot
}


}


/* ------------------
* Thunks
--------------------*/

export const getSpots = () => async (dispatch) =>{

    const response = await csrfFetch('/api/spots')
    
    const data = await response.json()
    
    dispatch(getAllSpots(data.Spots))
    return data.spots;
    
    
    
    }

    export const createSpot = (createSpotFormData)=> async (dispatch)=>{

        const url = '/api/spots'
        const method = 'POST'
        const body = JSON.stringify(createSpotFormData)
        const options = { method, body}

        const response = await csrfFetch(url, options)

        const data = await response.json()
        console.log(">>>>>>data returned from server to createSpot thunk ", data);
        dispatch(addSpot(data))
        return data;
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
    case ADD_SPOT:{
        const obj = {}
        const newSpot = action.payload;
        obj[newSpot.id] = newSpot;
        return{...state, ...obj };
    }
        default:
            return state;
}
}

export default spotsReducer