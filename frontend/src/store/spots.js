import { csrfFetch } from "./csrf";

/* --------------------
*Action Types
--------------------*/

const GET_SPOTS = '/spots/GET_SPOTS'


const ADD_SPOT = '/spots/ADD_SPOT'
const DELETE_SPOT = '/spots/DELETE_SPOT'


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

const deleteSpot = (id) =>{
    return{
        type:DELETE_SPOT,
        payload: id
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
    
        dispatch(addSpot(data))
        return data;
    }


   export const updateASpot = (updateSpotFormData, id) => async(dispatch)=>{
    const url = `/api/spots/${id}`
    const method = 'PUT'
    const body = JSON.stringify(updateSpotFormData)
    const options = { method, body}

    const response = await csrfFetch(url, options)

    const data = await response.json()

    dispatch(addSpot(data))
return data;



   }


   export const deleteASpot = (id) => async (dispatch) =>{

    const url = `/api/spots/${id}`

    const method = 'DELETE'

    const options = {method}

    const response = await csrfFetch(url, options)
    if(response.ok){
    dispatch(deleteSpot(id))
    }
    return response




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
        const newState = {...state}
        const newSpot = action.payload;
        newState[newSpot.id] = newSpot;
        return newState;
    }
    case DELETE_SPOT:{
        const newState = {...state}
delete newState[action.payload]
return newState
    }
        default:
            return state;
}
}

export default spotsReducer