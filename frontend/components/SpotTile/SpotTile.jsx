import { NavLink } from 'react-router-dom'
import { MdOutlineStar } from "react-icons/md";

import '../../src/index.css'

function SpotTile({spot}){

//create the tile design for each spot


return (
    <NavLink to={`spots/${spot.id}`} >
    <div id="spot-tile" className="tooltip" >
        <span className="tooltiptext">{spot.name}</span>
      
    <img id="spot-img" alt={spot.name} src={spot.previewImage}/>

<div id='location-rating-price-container'> 
    <div id='location-rating-container'>   
      <span id="location-caption">{spot.city}, {spot.state}</span>
      <span id='landing-page-rating' className='rating-star'><MdOutlineStar /> 
       {spot.avgRating !== null ? (+spot.avgRating).toFixed(1) : "New"}</span>
       </div>

      <span>${spot.price} night</span>
    </div>
    </div>
    </NavLink>
)

}


export default SpotTile