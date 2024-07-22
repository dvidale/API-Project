import { Link } from 'react-router-dom'
import { MdOutlineStar } from "react-icons/md";
import DeleteSpotModal from '../DeleteSpotModal'
import OpenModalButton from '../OpenModalButton'
import '../../src/index.css'


function OwnerSpotTile({spot}){
 




return (
   
    <div id="spot-tile">
        
    
    <Link to={`/spots/${spot.id}`}><tool-tip>Burp{spot.name}</tool-tip><img id="spot-img" alt={spot.name} src={spot.previewImage}/></Link>

    <div id='location-rating-price-container'> 
    <div id='location-rating-container'>  
     <Link to={`/spots/${spot.id}`}> <span id='landing-page-rating'>{spot.city}, {spot.state}</span> </Link>
      <Link to={`/spots/${spot.id}`}><span><MdOutlineStar />{spot.avgRating !== null ? (+spot.avgRating).toFixed(1) : "New"}</span></Link>
      </div>

      <Link to={`/spots/${spot.id}`}><span>${spot.price} night</span></Link>
      </div>
<div className='update-delete-button-container'>
      <div id='update-btn'><Link to={`/spots/${spot.id}/edit`}>Update</Link></div>
    
    <div><OpenModalButton
              buttonText="Delete"
              modalComponent={<DeleteSpotModal spotId={spot.id}/>}
            />
            </div>
            </div>


    </div>
   
)

}


export default OwnerSpotTile