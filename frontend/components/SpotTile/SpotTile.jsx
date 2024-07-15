import {useDispatch} from 'react-redux'
import { useEffect } from 'react'
import * as sessionActions from '../../src/store';

function SpotTile(){
const dispatch = useDispatch()
//dispatch for the spots

    //map out all the spot results returned
    useEffect(()=>{
        async () =>{
            const spots = await dispatch(sessionActions.getSpots())
console.log(">>>> get spots", spots);
        }
       


    },[dispatch])



return (
    <>
    <h1>Spot Tile</h1>

    
    </>

)

}


export default SpotTile