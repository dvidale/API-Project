import { useSelector } from "react-redux";
import OwnerSpotTile from "../OwnerSpotTile";
import { Link } from "react-router-dom";


function ManageSpotsPage(){

const allTheSpots = useSelector(state => state.spots)
const currentUser = useSelector(state => state.session.user)


const allSpotsArr = Object.values(allTheSpots)

const ownerSpots = allSpotsArr.filter(spot =>{
        return (
            spot.ownerId === currentUser.id
    )
}) 


return (

    <>
 
    <h1>Manage Spots</h1>

    { ownerSpots.length > 0 ? (
        <>
        {ownerSpots.map((spot)=>{
        return (
            <OwnerSpotTile key={spot.id} spot={spot}/>
        )
        } )}
 </> 
):(
        <>
       
        <Link to='/spots/new'>Create a New Spot</Link>
        </>

    )}

    </>
)


}


export default ManageSpotsPage;