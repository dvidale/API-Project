import SpotTile from "../SpotTile"
import { useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import * as spotsActions from '../../src/store/spots';
import '../../src/index.css'

function HomePage(){

    let spots = useSelector((state)=> state.spots);

    
const dispatch = useDispatch()
useEffect(()=>{

   dispatch(spotsActions.getSpots())

},[dispatch])

const spotsList = Object.values(spots)

    return(
        <>
        <h1>HomePage</h1>
        {
            spotsList.map(spot => {

                return (
                
                <SpotTile key={spot.id} spot={spot}/>
                
                )
            })
        }
        
        </>
    )
}


export default HomePage