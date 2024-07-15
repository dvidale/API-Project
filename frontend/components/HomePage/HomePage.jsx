// import SpotTile from "../SpotTile"
import { useDispatch} from "react-redux";
import { useEffect } from "react";
import * as spotsActions from '../../src/store/spots';
// import { getSpots } from "../../src/store/spots";

function HomePage(){

    // const spots = useSelector((state)=> state.spots);

    
const dispatch = useDispatch()
useEffect(()=>{
  dispatch(spotsActions.getSpots())

},[dispatch])

// const spotsList = Object.entries(spots)
// console.log(">>>>spotsList", spotsList);
    return(
        <>
        <h1>HomePage</h1>
        {/* {
            spotsList.map(spot => {

                return (
                <SpotTile key={spot.id} spot={spot.name}/>
                )
            })
        } */}
        
        </>
    )
}


export default HomePage