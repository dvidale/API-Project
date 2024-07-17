import { Link } from 'react-router-dom'
import DeleteSpotModal from '../DeleteSpotModal'
import OpenModalButton from '../OpenModalButton'



function OwnerSpotTile({spot}){
 




return (
   
    <div id="spot-tile" className="tooltip" >
        <span className="tooltiptext">{spot.name}</span>
    
    <Link to={`/spots/${spot.id}`}><img id="spot-img" alt={spot.name} src={spot.previewImage}/></Link>
     
     <Link to={`/spots/${spot.id}`}> <p>{spot.city}, {spot.state}</p> </Link>
      
      <div id='update-btn'><Link to={`/spots/${spot.id}/edit`}>Update</Link></div>
      
      <div id="delete-btn"><Link>Delete</Link></div>
      <div><OpenModalButton
                buttonText="Delete"
                modalComponent={<DeleteSpotModal spotId={spot.id}/>}
              />
              </div>
      
      <Link to={`/spots/${spot.id}`}><p>{spot.avgRating ? spot.avgRating : "New"}</p></Link>
      
      <Link to={`/spots/${spot.id}`}><p>${spot.price} night</p></Link>
    </div>
   
)

}


export default OwnerSpotTile