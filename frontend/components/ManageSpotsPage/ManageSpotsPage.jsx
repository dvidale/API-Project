// import { useSelector } from "react-redux";
import OwnerSpotTile from "../OwnerSpotTile";
import { useLoaderData, Link } from "react-router-dom";

function ManageSpotsPage(){

//     const sessionUser = useSelector((state) => state.session.user);
// console.log(">>>>session user in ManageSpots", sessionUser);
const ownerSpots = useLoaderData()




return (

    <>
 
    <h1>Manage Spots</h1>

    { ownerSpots.Spots.length > 0 ? (
        <>
        {ownerSpots.Spots.map((spot)=>{
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