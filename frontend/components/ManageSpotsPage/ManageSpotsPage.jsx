import { useSelector } from "react-redux";
import OwnerSpotTile from "../OwnerSpotTile";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as spotsActions from '../../src/store/spots'

import '../../src/index.css'
import '../Navigation/Navigation.css'
function ManageSpotsPage(){

const dispatch = useDispatch();


const allTheSpots = useSelector(state => state.spots)
const currentUser = useSelector(state => state.session.user)



useEffect(()=>{

    dispatch(spotsActions.getOwnerSpots())


},[dispatch])



const allSpotsArr = Object.values(allTheSpots)


const ownerSpots = allSpotsArr.filter(spot =>{
        return (
            spot.ownerId === currentUser.id
    )
}) 


return (

    <>
 <div className="manage-spots-title">
    <h1 >Manage Spots</h1></div>

    { ownerSpots.length > 0 ? (
        <>
        <div id="spot-tile-container">
        {ownerSpots.map((spot)=>{
        return (
            <OwnerSpotTile key={spot.id} spot={spot}/>
        )
        } )}
        </div>
 </> 
):(
        <>
       <div id="spot-tile-container">
        <Link to='/spots/new'>Create a New Spot</Link>
        </div>
        </>

    )}

    </>
)


}


export default ManageSpotsPage;