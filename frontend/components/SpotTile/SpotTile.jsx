import {Link } from 'react-router-dom'
import { MdOutlineStar } from "react-icons/md";

import '../../src/index.css'
import "../SpotDetailsPage/spotdetails.css";

function SpotTile({spot}){


//create the tile design for each spot


return (
    // <NavLink to={`spots/${spot.id}`} >
    <div id="spot-tile" className="tooltip" >
        <span className="tooltiptext">{spot.name}</span>
      
        <Link to={`/spots/${spot.id}`}> <img id="spot-img" alt={spot.name} src={spot.previewImage}/></Link>

<div id='location-rating-price-container'> 
    <div id='location-rating-container'>   
    <Link to={`/spots/${spot.id}`}><span id="location-caption">{spot.city}, {spot.state}</span></Link>

    <div id="star-rating"><Link to={`/spots/${spot.id}`}>  <span className='rating-star'><MdOutlineStar /> </span>
   
       {spot.avgRating !== null ? (+spot.avgRating).toFixed(1) : "New"} </Link> </div>
       </div>

       <Link to={`/spots/${spot.id}`}><span>${spot.price} night</span></Link>
    </div>
    </div>
    // </NavLink>
)

}


export default SpotTile