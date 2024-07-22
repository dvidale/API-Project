import {Link } from 'react-router-dom'
import { MdOutlineStar } from "react-icons/md";

import '../../src/index.css'
import "../SpotDetailsPage/spotdetails.css";

function SpotTile({spot}){


//create the tile design for each spot


return (
    
    <div id="spot-tile">
      
        <Link to={`/spots/${spot.id}`}><tool-tip inert role="tooltip">{spot.name}</tool-tip> <img height="200px" id="spot-img" alt={spot.name} src={spot.previewImage}/></Link>

<div id='location-rating-price-container'> 
    <div id='location-rating-container'>   
    <Link to={`/spots/${spot.id}`}><span id="location-caption">{spot.city}, {spot.state}</span></Link>

    <div id="star-rating"><Link to={`/spots/${spot.id}`}>  <span className='rating-star'><MdOutlineStar /> </span>
   
       {spot.avgRating !== null ? (+spot.avgRating).toFixed(1) : "New"} </Link> </div>
       </div>

       <Link to={`/spots/${spot.id}`}><span id="spot-price-bold">${spot.price}</span><span> night</span></Link>
    </div>
    </div>
 
)

}


export default SpotTile